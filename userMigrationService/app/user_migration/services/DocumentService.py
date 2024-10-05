import requests
import logging
logging.basicConfig(level=logging.INFO)

BASE_DOCUMENT_URL = ""


class DocumentService:

    @staticmethod
    def save_user_documents(user_id, documents):
        documents_formatted = {
            "documents": [
                {doc_key: urls[0]}
                for doc_key, urls in documents.items()
            ]
        }
        user_data = {"documents": documents_formatted}
        logging.info(f"SAVE USER DOCUMENTS REQUEST: {user_id} {user_data}")
        response = requests.post(f"{BASE_DOCUMENT_URL}/v1/users/{user_id}/transfer-docs", json=user_data)
        logging.info(f"Finished saving documents for user {user_id} with status code {response.status_code}")
        if not response.ok:
            raise Exception(f"Failed request for saving documents for user {user_id}. Reason {response.json()}")
