from http import HTTPStatus

from flask import Blueprint, request, jsonify, Response

from app.user_migration.processors.TransferCitizenProcessor import TransferCitizenProcessor

user_migration = Blueprint("user_migration", __name__)


@user_migration.route("/transferCitizen", methods=["POST"])
def transfer_citizen():
    return TransferCitizenProcessor.process("message")
