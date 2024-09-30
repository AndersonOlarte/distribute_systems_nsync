from app.user_migration.services.PublishService import PublishService


class TransferCitizenConfirmPublisherProcessor:
    @staticmethod
    def process(message):
        PublishService.publish_confirmation(message)
        return "Confirmation received successfully"
