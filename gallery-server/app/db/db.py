import sqlite3


class Database:
    def __init__(self, db_path):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.create_images_table()

    def create_images_table(self):
        cur = self.conn.cursor()
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
        self.conn.commit()

    def insert_image(self, name, date, description, image_path, thumb_path):
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        cur = self.conn.cursor()
        cur.execute("INSERT INTO images (name, date, description, image_path, thumb_path) VALUES (?,?,?,?,?)",
                    (name, date, description, image_path, thumb_path))
        self.conn.commit()
        id = cur.lastrowid
        return id

    def delete_image(self, image_id):
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        cur = self.conn.cursor()
        cur.execute("DELETE from images WHERE id=?", (image_id,))
        self.conn.commit()

    def get_all_images(self):
        cur = self.conn.cursor()
        cur.execute("SELECT id, name, date, description, image_path, thumb_path  FROM images")
        rows = cur.fetchall()
        images = [{
            'id': row[0],
            'name': row[1],
            'date': row[2],
            'description': row[3],
            'image_path': row[4],
            'thumb_path': row[5]
        } for row in rows]
        return images

    def close(self):
        self.conn.close()
