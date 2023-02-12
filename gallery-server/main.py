import logging
import os
import sqlite3
import sys

from flask import Flask, jsonify, request

app = Flask(__name__)

logger = logging.getLogger('main')
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)


@app.route('/api/upload', methods=['POST'])
def upload_image():
    image_file = request.files['image']
    name = request.form['name']
    date = request.form['date']
    description = request.form['description']

    image_path = os.path.join('images', image_file.filename)
    image_file.save(image_path)

    conn = sqlite3.connect('images.db')
    c = conn.cursor()

    c.execute("INSERT INTO images (name, date, description, path) VALUES (?,?,?,?)",
              (name, date, description, image_path))
    conn.commit()
    conn.close()
    logger.info(f"Image uploaded successfully: name={name}, date={date}, description={description}")

    return jsonify({'message': 'Image uploaded successfully'})


@app.route('/api/images', methods=['GET'])
def get_images():
    def get_images():
        conn = sqlite3.connect('images.db')
        c = conn.cursor()

        logger.info("Getting images from DB")
        c.execute("SELECT name, date, description, path FROM images")
        images = c.fetchall()
        conn.close()

        return jsonify({'images': images})


if __name__ == '__main__':
    app.run(debug=True)
