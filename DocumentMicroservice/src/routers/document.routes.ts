import { Router } from 'express';
import { getDocumentsByFolderId, upload, uploadDocument } from '../controllers/document.controller';


const routerDocument = Router();


routerDocument.post('/v1/users/:userid/folders/:folderid/document',upload.single('newFile'),uploadDocument);
routerDocument.get('/v1/users/:userid/folders/:folderid/documents', getDocumentsByFolderId);


export default routerDocument;