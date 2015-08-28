import logbook

class Logger(object):

    LEVELS = ["CRIT", "ERR", "WARN", "INFO", "DEBUG"]

    def __init__(self, level="WARN"):
        self.log = logbook.Logger(__name__)
        self.__level = 2
        self.level = level

    @property
    def level(self):
        return self.LEVELS[self.__level]

    @level.setter
    def level(self, level=None):
        if level in self.LEVELS:
            self.__level = self.LEVELS.index(level)

    def level_within(self, level):
        if level in self.LEVELS:
            return self.__level >= self.LEVELS.index(level)
        return False

    def debug(self, *args, **kwargs):
        if self.level_within("DEBUG"):
            return self.log.debug(*args, **kwargs)
        return False

    def info(self, *args, **kwargs):
        if self.level_within("INFO"):
            return self.log.info(*args, **kwargs)
        return False

    def warn(self, *args, **kwargs):
        if self.level_within("WARN"):
            return self.log.warning(*args, **kwargs)
        return False

    def err(self, *args, **kwargs):
        if self.level_within("ERR"):
            return self.log.error(*args, **kwargs)
        return False

    def crit(self, *args, **kwargs):
        if self.level_within("CRIT"):
            return self.log.critical(*args, **kwargs)
        return False

log = Logger()
