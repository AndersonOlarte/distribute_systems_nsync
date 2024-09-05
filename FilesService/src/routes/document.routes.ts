import { Router } from 'express';
import { uploadDocument } from '../controllers/document.controller';
import bodyParser from 'body-parser';


const routerDocument = Router();


routerDocument.get('/v1/document',uploadDocument);


export default routerDocument;