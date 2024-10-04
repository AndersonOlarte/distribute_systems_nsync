class UserService:

    @staticmethod
    def delete_user_metadata(user_id):
        print(f"CIELOS; FUI A BORRAR EL USUARIO {user_id}")

    @staticmethod
    def validate_transfer_solicitude(user_id):
        print(f"CIELOS; FUI A VALIDAR QUE EL USUARIO {user_id} SOLICITARA TRANSFERENCIA")

        # Throw exception if not valid
        return True

    @staticmethod
    def create_user(user_id, user_name, user_email):
        print(f"CIELOS; FUI A CREAR EL USUARIO {user_id}")