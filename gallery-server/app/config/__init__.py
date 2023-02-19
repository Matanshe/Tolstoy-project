import logging


class Config:
    LOGGING_FORMAT = '%(asctime)s %(levelname)s %(message)s'
    LOGGING_LOCATION = 'app.log'
    LOGGING_LEVEL = logging.DEBUG

    @staticmethod
    def init_app(app):
        app.logger.setLevel(Config.LOGGING_LEVEL)
        handler = logging.StreamHandler()
        handler.setLevel(Config.LOGGING_LEVEL)
        formatter = logging.Formatter(Config.LOGGING_FORMAT)
        handler.setFormatter(formatter)
        app.logger.addHandler(handler)
