from app.user_migration.services.QueueService import QueueService


class NotificationService:

    @staticmethod
    def send_notification(user_id, action):
        notification = NotificationService.build_message(user_id, action)
        QueueService.publish_message(notification, "NOTIFICATE_USER", "notifications")
        print(f"Finished sending notification for user {user_id}")

    @staticmethod
    def build_message(user_id, action):
        return {"data": {"userId": user_id, "eventType": action}}
