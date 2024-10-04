import requests

from app.user_migration.exceptions.invalid_request_exception import InvalidRequestException

NSYNC_OPERATOR_ID = "66ca18cd66ca9f0015a8afb3"
NSYNC_OPERATOR_NAME = "Nsync"
class CentralizerService:

    @staticmethod
    def register_user(user_id, user_name, user_email):
        citizen_data = {
            "id": user_id,
            "name": user_name,
            "address": "UNDEFINED",
            "email": user_email,
            "operatorId": NSYNC_OPERATOR_ID,
            "operatorName": NSYNC_OPERATOR_NAME
        }

        response = requests.post('https://govcarpeta-apis-83e1c996379d.herokuapp.com/apis/registerCitizen', json=citizen_data)
        print(f"Finished registration in govcarpeta for user {user_id} with status code {response.status_code}")
        print(response.json())
        if not response.ok:
            raise Exception(f"Failed request of confirmation for user {user_id}. Reason {response.json()}")

    @staticmethod
    def validate_user_not_registered(user_id):
        response = requests.get(f'https://govcarpeta-apis-83e1c996379d.herokuapp.com/apis/validateCitizen/{user_id}')
        print(f"Finished validation of user in govcarpeta. UserId {user_id} responded with status code {response.status_code}")
        if response.status_code == 200:
            raise InvalidRequestException("user still registered in govCarpeta")
        elif response.status_code == 204:
            return
        else:
            raise Exception(f"Failed request of confirmation for user {user_id}. Reason {response.json()}")