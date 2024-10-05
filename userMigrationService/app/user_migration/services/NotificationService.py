from app.user_migration.services.QueueService import QueueService
import logging
logging.basicConfig(level=logging.INFO)


class NotificationService:

    @staticmethod
    def send_notification(user_id, action):
        notification = NotificationService.build_message(user_id, action)
        logging.info(f"SEND USER NOTIFICATION: {notification}")
        QueueService.publish_message(notification, "NOTIFICATE_USER", "notifications")
        logging.info(f"Finished sending notification for user {user_id}")

    @staticmethod
    def build_message(user_id, action):
        return {"data": {"userId": user_id, "eventType": action}}
