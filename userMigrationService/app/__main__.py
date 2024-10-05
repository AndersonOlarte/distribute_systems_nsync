from app import create_app
import logging
import sys


app = create_app()

# Configura el logger
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')


# Función personalizada para manejar excepciones no capturadas
def handle_exception(exc_type, exc_value, exc_traceback):
    if issubclass(exc_type, KeyboardInterrupt):
        sys.__excepthook__(exc_type, exc_value, exc_traceback)
        return
    logging.error("Ocurrió un error no esperado:", exc_info=(exc_type, exc_value, exc_traceback))


# Redirige las excepciones no capturadas a handle_exception
sys.excepthook = handle_exception

if __name__ == "__main__":  # Only in dev
    app.run(host="0.0.0.0", port=8080, debug=True)  # nosec
