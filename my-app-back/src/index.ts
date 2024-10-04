import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-data', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      identification,
      name,
      age,
      email,
      address,
      createdDate,
      updatedDate,
      isActived,
    } = req.body;

    // Armamos el nuevo body para enviar al servicio externo
    const newBody = {
      id: parseInt(identification, 10), // Convertir userId a número
      name: name,               // Usar el nombre enviado desde el frontend
      address: address,         // Dirección enviada desde el frontend
      email: email,             // Correo enviado desde el frontend
      operatorId: '66ca18cd66ca9f0015a8afb3', // Valor fijo
      operatorName: 'Nsync'                    // Valor fijo
    };

    // Hacer la petición POST al servicio externo
    const externalResponse = await axios.post('https://govcarpeta-apis-83e1c996379d.herokuapp.com/apis/registerCitizen', newBody);

    // Manejar los diferentes códigos de respuesta
    if (externalResponse.status === 201) {
      res.status(201).json({
        message: `Ciudadano con id: ${newBody.id} se ha relacionado con Operador ${newBody.operatorName}. Creado exitosamente`,
        response: externalResponse.data
      });
    } else if (externalResponse.status === 500) {
      res.status(500).json({
        error: 'failed: Application Error..',
      });
    } else if (externalResponse.status === 501) {
      res.status(501).json({
        error: `failed: Error al crear Ciudadano con id: ${newBody.id} ya se encuentra registrado en la carpeta ciudadana`,
      });
    } else {
      // Manejo genérico para cualquier otro código de estado
      res.status(externalResponse.status).json({
        error: 'Error desconocido al interactuar con la API externa',
        details: externalResponse.data
      });
    }

  } catch (error) {
    // Castear el error a any o verificar si es un error de Axios
    if (axios.isAxiosError(error)) {
      console.error('Error sending data:', error.response?.data);
      res.status(500).json({
        error: 'Error enviando datos al servicio externo',
        details: error.response?.data || error.message,
      });
    } else {
      const e = error as Error;
      console.error('Error sending data:', e.message);
      res.status(500).json({
        error: 'Error general en el servidor',
        details: e.message,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
