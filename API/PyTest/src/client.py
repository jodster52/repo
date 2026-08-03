import requests


class RestfulBookerClient:
    """Thin wrapper around the restful-booker API used by the test suite."""

    def __init__(self, base_url):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()

    def create_token(self, username, password):
        return self.session.post(
            f"{self.base_url}/auth",
            json={"username": username, "password": password},
        )

    def get_booking_ids(self, **params):
        return self.session.get(f"{self.base_url}/booking", params=params)

    def get_booking(self, booking_id):
        return self.session.get(f"{self.base_url}/booking/{booking_id}")

    def create_booking(self, payload):
        return self.session.post(f"{self.base_url}/booking", json=payload)

    def update_booking(self, booking_id, payload, token):
        return self.session.put(
            f"{self.base_url}/booking/{booking_id}",
            json=payload,
            headers=self._auth_header(token),
        )

    def partial_update_booking(self, booking_id, payload, token):
        return self.session.patch(
            f"{self.base_url}/booking/{booking_id}",
            json=payload,
            headers=self._auth_header(token),
        )

    def delete_booking(self, booking_id, token):
        return self.session.delete(
            f"{self.base_url}/booking/{booking_id}",
            headers=self._auth_header(token),
        )

    @staticmethod
    def _auth_header(token):
        return {"Cookie": f"token={token}"}
