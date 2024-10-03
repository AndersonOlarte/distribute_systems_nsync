import { Router } from 'express';
import { deleteUserDocuments, getDocumentsByFolderId, upload, uploadDocument } from '../controllers/document.controller';


const routerDocument = Router();


routerDocument.post('/v1/users/:userid/folders/:folderid/document',upload.single('newFile'),uploadDocument);
routerDocument.get('/v1/users/:userid/folders/:folderid/documents', getDocumentsByFolderId);
routerDocument.delete('/v1/users/:userid/delete-docs', deleteUserDocuments);


export default routerDocument;