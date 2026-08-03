from src.config import AUTH_PASSWORD, AUTH_USERNAME


def test_create_token_returns_200_with_token(client):
    response = client.create_token(AUTH_USERNAME, AUTH_PASSWORD)

    assert response.status_code == 200
    assert "token" in response.json()
