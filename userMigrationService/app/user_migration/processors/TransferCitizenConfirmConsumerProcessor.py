from datetime import datetime

from app.user_migration.services.NotificationService import NotificationService
from app.user_migration.services.UserService import UserService


class TransferCitizenConfirmConsumerProcessor:
    @staticmethod
    def process(message):
        user_id = message['id']

        if not UserService.validate_transfer_solicitude(user_id):
            return
        UserService.delete_user_metadata(user_id)
        NotificationService.send_notification(user_id, "notification.new.user")
        return "User transferred successfully"
