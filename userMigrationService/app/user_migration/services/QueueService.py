import pika
import json
import os

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT', 5672))
RABBITMQ_USER = os.getenv('RABBITMQ_USER', 'guest')
RABBITMQ_PASSWORD = os.getenv('RABBITMQ_PASSWORD', 'guest')

credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
parameters = pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT, credentials=credentials)
routing_keys_by_operation = {"TRANSFER_CITIZEN": "transferCitizen_queue",
                             "CONFIRM_TRANSFER": "confirmCitizen_queue",
                             "NOTIFICATE_USER": "notification.nsync"}


class QueueService:

    @staticmethod
    def get_connection():
        return pika.BlockingConnection(parameters)

    @staticmethod
    def publish_message(message, operation, exchange):
        connection = QueueService.get_connection()
        channel = connection.channel()

        channel.basic_publish(
            exchange=exchange,
            routing_key=routing_keys_by_operation[operation],
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=2,
            )
        )

        connection.close()
