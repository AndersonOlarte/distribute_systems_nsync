import requests
import logging
logging.basicConfig(level=logging.INFO)


class DocumentService:

    @staticmethod
    def save_user_documents(user_id, documents):
        logging.info(f"SAVE USER DOCUMENTS REQUEST: {user_id} {documents}")
        #ADD PROPER REQUEST response = requests.post(operator_confirmation_url, json=user_id_json)
        logging.info(f"CIELOS; RECIBI DOCUMENTOS para user id {user_id}")
        return
        logging.info(f"Finished saving documents for user {user_id} with status code {response.status_code}")
        logging.info(f"SAVE USER DOCUMENTS RESPONSE: {response.json()}")
        if not response.ok:
            raise Exception(f"Failed request for saving documents for user {user_id}. Reason {response.json()}")
