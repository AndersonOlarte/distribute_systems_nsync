from app.user_migration.services.PublishService import PublishService


class TransferCitizenPublisherProcessor:
    @staticmethod
    def process(message):
        PublishService.publish_transaction(message)
        return "User transaction received successfully"
