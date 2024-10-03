import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import userRouter from './routes/user.routes';
import 'dotenv/config';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(userRouter);
export default app;