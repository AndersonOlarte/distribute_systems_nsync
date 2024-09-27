import express from 'express';
import morgan from 'morgan';
import routerFolder from './routes/folder.routes';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors()); 

app.use(routerFolder);

export default app;
