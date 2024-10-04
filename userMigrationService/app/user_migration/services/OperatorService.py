import requests


class OperatorService:

    @staticmethod
    def confirm_user_transaction(user_id, operator_confirmation_url):
        user_id_json = {"id": user_id}
        response = requests.post(operator_confirmation_url, json=user_id_json)
        print(f"Finished confirmation of transaction for user {user_id} with status code {response.status_code}")
        print(response.json())
        if not response.ok:
            raise Exception(f"Failed request of confirmation for user {user_id}. Reason {response.json()}")
