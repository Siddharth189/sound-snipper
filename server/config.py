import configparser

cfg = configparser.ConfigParser()

# Parsing configuration from config.cfg
cfg.read("config.cfg")

# Database Configuration
HOST = cfg['DB']['clusterAddress']
USER = cfg['DB']['username']
PASSWORD = cfg['DB']['password']
DATABASE = cfg['DB']['database']