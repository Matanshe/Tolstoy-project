import datetime
import logging
import os
import sqlite3
import sys
import time

from PIL import Image
from flask import Flask, jsonify, request

app = Flask(__name__, static_folder='images')

logger = logging.getLogger('main')
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)


def create_images_table():
    conn = sqlite3.connect('../images_db.db')

    cur = conn.cursor()
    logger.info("Creating images table in DB if not exist")
    cur.execute('''
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT,
            image_path TEXT NOT NULL,
            thumb_path TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()


with app.app_context():
    create_images_table()


def generate_thumbnail(image_path, thumb_path, size=(128, 128)):
    with Image.open(image_path) as im:
        im.thumbnail(size)
        im.save(thumb_path)


@app.route('/api/upload', methods=['POST'])
def upload_image():
    logger.debug(f"Got request form : {request.form.to_dict()} ---  {request.files.to_dict()}")
    image_file = request.files.get('file')
    if image_file is None:
        logger.error("No image file provided")
        return jsonify({'message': 'No image file provided'}), 400

    name = request.form.get('name', '')
    ts = time.time()
    date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    description = request.form.get('description', '')

    # image_path = f"./gallery-server/images/{image_file.filename}"
    image_path = f"../images/{image_file.filename}"
    logger.debug(f"working dir: {os.getcwd()}")
    image_file.save(image_path)

    base_path = os.path.split(image_path)[0]
    file_name = os.path.split(image_path)[1]
    thumb_path = os.path.join(base_path, "thumbs", file_name)

    generate_thumbnail(image_path, thumb_path)
    conn = sqlite3.connect('../images_db.db')
    c = conn.cursor()

    c.execute("INSERT INTO images (name, date, description, image_path, thumb_path) VALUES (?,?,?,?,?)",
              (name, date, description, image_path, thumb_path))
    conn.commit()
    conn.close()
    logger.info(f"Image uploaded successfully: name={name}, date={date}, description={description}")

    return jsonify({'message': 'Image uploaded successfully'}, 200)


@app.route('/api/delete', methods=['DELETE'])
def delete_image():
    image_id = request.args.get('id')
    conn = sqlite3.connect('../images_db.db')
    c = conn.cursor()
    c.execute("DELETE from images WHERE id=?", (image_id,))
    conn.commit()
    conn.close()
    # need to implement - delete the image file itself
    return jsonify({'message': 'Image deleted successfully'}, 200)



@app.route('/api/images', methods=['GET'])
def get_images():
    conn = sqlite3.connect('../images_db.db')
    c = conn.cursor()

    logger.info("Getting images from DB")
    c.execute("SELECT id, name, date, description, image_path, thumb_path  FROM images")
    rows = c.fetchall()
    conn.close()

    images = []
    for row in rows:
        image = {
            'id': row[0],
            'name': row[1],
            'date': row[2],
            'description': row[3],
            'image_path': row[4],
            'thumb_path': row[5]
        }
        images.append(image)

    return jsonify({'images': images})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
