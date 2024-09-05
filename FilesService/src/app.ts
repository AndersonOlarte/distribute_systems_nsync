import express from 'express';
import routerDocument from './routes/document.routes';
import morgan from 'morgan';
import routerFolder from './routes/folder.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());


app.use(routerDocument);    
app.use(routerFolder);

export default app;
