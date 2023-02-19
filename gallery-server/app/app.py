import datetime
import os
import time

from flask import Flask, jsonify, request

from config import Config
from db import Database
from utils.image_utils import generate_and_save_thumbnail, get_thumb_path

app = Flask(__name__, static_folder='images')
app.config.from_object(Config)
Config.init_app(app)

db = Database('db/images.db')


@app.route('/api/upload', methods=['POST'])
def upload_image():
    app.logger.debug(f"Got request form : {request.form.to_dict()} ---  {request.files.to_dict()}")
    image_file = request.files.get('file')
    if image_file is None:
        app.logger.error("No image file provided")
        return jsonify({'message': 'No image file provided'}), 400

    name = request.form.get('name', '')
    ts = time.time()
    date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    description = request.form.get('description', '')

    image_path = f"../images/{image_file.filename}"
    app.logger.debug(f"working dir: {os.getcwd()}")
    image_file.save(image_path)

    thumb_path = get_thumb_path(image_path)

    generate_and_save_thumbnail(image_path, thumb_path)
    db.insert_image(name, date, description, image_path, thumb_path)

    app.logger.info(f"Image uploaded successfully: name={name}, date={date}, description={description}")

    return jsonify({'message': 'Image uploaded successfully'}, 200)


@app.route('/api/delete', methods=['DELETE'])
def delete_image():
    image_id = request.args.get('id')
    db.delete_image(image_id)

    # need to implement - delete the image file itself
    return jsonify({'message': 'Image deleted successfully'}, 200)


@app.route('/api/images', methods=['GET'])
def get_images():
    app.logger.info("Getting images from DB")
    images = db.get_all_images()
    return jsonify({'images': images})


if __name__ == '__main__':
    db.create_images_table()
    app.run(host="0.0.0.0", port=5001)
