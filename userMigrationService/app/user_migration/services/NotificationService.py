class NotificationService:

    @staticmethod
    def send_notification(user_id, action, timestamp):
        #ADD PROPER REQUEST response = requests.post(operator_confirmation_url, json=user_id_json)
        print(f"CIELOS; FUI A NOTIFICAR {user_id}")
        return
        print(f"Finished sending notification for user {user_id} with status code {response.status_code}")
        print(response.json())
        if not response.ok:
            raise Exception(f"Failed sending notification for user {user_id}. Reason {response.json()}")

