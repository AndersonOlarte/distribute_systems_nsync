from app.user_migration.services.CentralizerService import CentralizerService
from app.user_migration.services.QueueService import QueueService


class TransferCitizenPublisherProcessor:
    @staticmethod
    def process(message):
        CentralizerService.validate_user_not_registered(message['id'])
        QueueService.publish_message(message, "TRANSFER_CITIZEN", "user_migration_exchange")
        return "User transaction received successfully"
