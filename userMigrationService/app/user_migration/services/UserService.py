import requests

from app.user_migration.exceptions.invalid_request_exception import InvalidRequestException
import logging
logging.basicConfig(level=logging.INFO)

BASE_USERS_URL = "https://a8ed037daf2624a7789a8d3f77bb0876-1513300967.us-east-1.elb.amazonaws.com:3002/v1/users/"


class UserService:

    @staticmethod
    def delete_user_metadata(user_id):
        logging.info(f"DELETE USER: {user_id}")
        response = requests.get(f"{BASE_USERS_URL}{user_id}")
        data = response.json()
        logging.info(f"DELETE USER RESPONSE: {data}")
        if not response.ok:
            raise Exception(f"Failed request of validation for user {user_id}. Reason {data}")

    @staticmethod
    def validate_transfer_solicitude(user_id):
        logging.info(f"CONFIRM USER TRANSFER SOLICITUDE: {user_id}")
        response = requests.get(f"{BASE_USERS_URL}{user_id}/transfer")
        data = response.json()
        logging.info(f"CONFIRM USER TRANSFER SOLICITUDE: {data}")
        if not response.ok:
            raise Exception(f"Failed request of validation for user {user_id}. Reason {data}")
        elif not data['transferConfirmation']:
            raise InvalidRequestException("User did not make a transfer solicitude")
        return True

    @staticmethod
    def create_user(user_id, user_name, user_email):
        user_data ={
            "name": user_name,
            "email": user_email,
            "age": 20,
            "identification": user_id,
            "govCarpertaId": user_id
        }

        logging.info(f"CREATE USER  REQUEST: {user_data}")
        response = requests.post(BASE_USERS_URL, json=user_data)
        logging.info(f"FINISHED CREATION FOR USER {user_id} with status code: {response.status_code}")
        if not response.ok:
            raise Exception(f"Failed request of confirmation for user {user_id}.")