import logging
import sqlite3
import sys

from flask import Flask, jsonify

app = Flask(__name__)

logger = logging.getLogger('main')
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s', stream=sys.stdout)


@app.route('/api/upload', methods=['POST'])
def upload_image():
    pass


@app.route('/api/images', methods=['GET'])
def get_images():
    def get_images():
        # Connect to the database
        conn = sqlite3.connect('images.db')
        c = conn.cursor()

        # Retrieve the list of images from the database
        c.execute("SELECT name, date, description, path FROM images")
        images = c.fetchall()
        conn.close()

        # Return the list of images as JSON data
        return jsonify({'images': images})


if __name__ == '__main__':
    app.run(debug=True)
