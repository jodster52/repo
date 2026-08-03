import os

from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.environ.get("BASE_URL", "https://restful-booker.herokuapp.com")
AUTH_USERNAME = os.environ.get("AUTH_USERNAME", "admin")
AUTH_PASSWORD = os.environ.get("AUTH_PASSWORD", "password123")
