import requests


class DocumentService:

    @staticmethod
    def save_user_documents(user_id, documents):
        #ADD PROPER REQUEST response = requests.post(operator_confirmation_url, json=user_id_json)
        print(f"CIELOS; RECIBI DOCUMENTOS para user id {user_id}")
        return
        print(f"Finished saving documents for user {user_id} with status code {response.status_code}")
        print(response.json())
        if not response.ok:
            raise Exception(f"Failed request for saving documents for user {user_id}. Reason {response.json()}")
