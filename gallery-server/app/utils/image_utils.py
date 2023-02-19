import os

from PIL import Image


def generate_and_save_thumbnail(image_path, thumb_path, size=(128, 128)):
    with Image.open(image_path) as im:
        im.thumbnail(size)
        im.save(thumb_path)


def get_thumb_path(image_path):
    base_path = os.path.split(image_path)[0]
    file_name = os.path.split(image_path)[1]
    thumb_path = os.path.join(base_path, "thumbs", file_name)
    return thumb_path
