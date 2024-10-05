from app.user_migration.exceptions.invalid_request_exception import InvalidRequestException
import logging
logging.basicConfig(level=logging.INFO)


class UserService:

    @staticmethod
    def delete_user_metadata(user_id):
        print(f"CIELOS; FUI A BORRAR EL USUARIO {user_id}")

    @staticmethod
    def validate_transfer_solicitude(user_id):
        print(f"CIELOS; FUI A VALIDAR QUE EL USUARIO {user_id} SOLICITARA TRANSFERENCIA")
        response = {}
        data = response.json()
        if not response.ok:
            raise Exception(f"Failed request of validation for user {user_id}. Reason {response.json()}")
        elif not data['transferConfirmation']:
            raise InvalidRequestException("User didnt made a transfer solicitude")
        return True

    @staticmethod
    def create_user(user_id, user_name, user_email):
        print(f"CIELOS; FUI A CREAR EL USUARIO {user_id}")