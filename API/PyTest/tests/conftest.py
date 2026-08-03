from datetime import date, timedelta

import pytest
from faker import Faker

from src.client import RestfulBookerClient
from src.config import AUTH_PASSWORD, AUTH_USERNAME, BASE_URL

fake = Faker()


@pytest.fixture(scope="session")
def client():
    return RestfulBookerClient(BASE_URL)


@pytest.fixture(scope="session")
def auth_token(client):
    response = client.create_token(AUTH_USERNAME, AUTH_PASSWORD)
    assert response.status_code == 200
    return response.json()["token"]


@pytest.fixture
def booking_payload():
    checkin = date.today() + timedelta(days=90)
    checkout = checkin + timedelta(days=7)
    return {
        "firstname": fake.first_name(),
        "lastname": fake.last_name(),
        "totalprice": 111,
        "depositpaid": True,
        "bookingdates": {
            "checkin": checkin.isoformat(),
            "checkout": checkout.isoformat(),
        },
        "additionalneeds": "Breakfast",
    }


@pytest.fixture
def created_booking(client, booking_payload):
    response = client.create_booking(booking_payload)
    assert response.status_code == 200
    booking_id = response.json()["bookingid"]
    return booking_id, booking_payload
