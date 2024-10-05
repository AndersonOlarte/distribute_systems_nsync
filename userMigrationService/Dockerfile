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

# Copia el resto del código de la aplicación
COPY . /app

# Expone el puerto 8080
EXPOSE 8080

# Comando por defecto para ejecutar la aplicación
CMD ["poetry", "run", "python", "-m", "app"]
