import { Router } from 'express';
import { deleteUserDocuments, getDocumentsByFolderId, info, upload, uploadDocument, uploadFilesFromTransfer } from '../controllers/document.controller';


const routerDocument = Router();


routerDocument.post('/v1/users/:userid/folders/:folderid/document',upload.single('newFile'),uploadDocument);
routerDocument.get('/v1/users/:userid/folders/:folderid/documents', getDocumentsByFolderId);
routerDocument.delete('/v1/users/:userid/delete-docs', deleteUserDocuments);

routerDocument.post('/v1/users/:userid/transfer-docs',uploadFilesFromTransfer);

routerDocument.get('/v1/info',info );

export default routerDocument;