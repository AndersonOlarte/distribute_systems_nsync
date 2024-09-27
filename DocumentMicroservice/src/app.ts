import express from "express";
import morgan from "morgan";
import routerDocument from "./routers/document.routes";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(routerDocument);

export default app;