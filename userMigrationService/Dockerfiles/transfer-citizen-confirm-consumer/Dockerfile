# Usa una imagen base de Python 3.12
FROM python:3.12-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pyproject.toml y poetry.lock (si existe)
COPY pyproject.toml poetry.lock* /app/

# Instala poetry
RUN pip install poetry

# Instala las dependencias del proyecto
RUN poetry install --no-root

COPY . /app

# Expone el puerto 8080
EXPOSE 8080

# Comando por defecto para ejecutar la aplicación
CMD ["poetry", "run", "python", "-m", "app.user_migration.consumer.TransferCitizenConfirmConsumer"]
#docker build -t user-migration-citizen-confirm-consumer-service:1.1 -f Dockerfiles/transfer-citizen-confirm-consumer/Dockerfile .
#docker tag user-migration-citizen-confirm-consumer-service:1.1 juanda0/user-migration-citizen-confirm-consumer-service:1.1
#docker push juanda0/user-migration-citizen-confirm-consumer-service:1.1