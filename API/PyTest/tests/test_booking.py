def test_get_booking_ids_returns_200_with_a_list(client):
    response = client.get_booking_ids()

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body, list)
    assert len(body) > 0
    assert "bookingid" in body[0]


def test_get_first_booking_details_returns_200(client):
    first_booking_id = client.get_booking_ids().json()[0]["bookingid"]

    response = client.get_booking(first_booking_id)

    assert response.status_code == 200
    body = response.json()
    for key in ("firstname", "lastname", "totalprice", "depositpaid", "bookingdates"):
        assert key in body


def test_create_booking_returns_the_submitted_booking(client, booking_payload):
    response = client.create_booking(booking_payload)

    assert response.status_code == 200
    body = response.json()
    assert "bookingid" in body
    assert body["booking"] == booking_payload


def test_get_created_booking_matches_submitted_payload(client, created_booking):
    booking_id, payload = created_booking

    response = client.get_booking(booking_id)

    assert response.status_code == 200
    assert response.json() == payload


def test_update_booking_totalprice(client, auth_token, created_booking):
    booking_id, payload = created_booking
    new_total = payload["totalprice"] + 20

    response = client.partial_update_booking(booking_id, {"totalprice": new_total}, auth_token)

    assert response.status_code == 200
    assert response.json()["totalprice"] == new_total


def test_delete_booking_returns_201_and_removes_the_booking(client, auth_token, created_booking):
    booking_id, _ = created_booking

    response = client.delete_booking(booking_id, auth_token)
    assert response.status_code == 201

    follow_up = client.get_booking(booking_id)
    assert follow_up.status_code == 404
