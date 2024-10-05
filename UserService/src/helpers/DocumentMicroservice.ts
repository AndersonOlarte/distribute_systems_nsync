import fetch from "node-fetch";
import { GetDocumentsByFolderId } from './DocumentMicroservice.types'

export class DocumentMicroservice {

    async getDocumentsByFolderId(userid: number, folderid: number): Promise<GetDocumentsByFolderId | null> {
        const documentMicroserviceURL = `${process.env.DOCUMENT_SERVICE_URL}:${process.env.DOCUMENT_SERVICE_PORT}/v1/users/${userid}/folders/${folderid}/documents`
        
        try {
            const documentMicroseriveReq  = await fetch(documentMicroserviceURL);
            const httpStatusCode = documentMicroseriveReq.status;
            let documentsRetrieved;
            if (httpStatusCode === 200) {
                const documentMicroserviceRes = await documentMicroseriveReq.json() as any;
                documentsRetrieved = documentMicroserviceRes.documents;
            }
            return {
                documents: documentsRetrieved,
                statusCode: httpStatusCode
            }
        } catch (error) {
            console.error(error);
            return null;
        }

    }

    async deleteDocumentsByUserId(userid: number): Promise<GetDocumentsByFolderId | null> {
        const documentMicroserviceURL = `${process.env.DOCUMENT_SERVICE_URL}:${process.env.DOCUMENT_SERVICE_PORT}/v1/users/${userid}/delete-docs`
        
        try {
            const documentMicroseriveReq  = await fetch(documentMicroserviceURL, {method: 'DELETE'});
            const httpStatusCode = documentMicroseriveReq.status;
            let documentsRetrieved;
            if (httpStatusCode === 200) {
                const documentMicroserviceRes = await documentMicroseriveReq.json() as any;
                documentsRetrieved = documentMicroserviceRes.documents;
            }
            return {
                documents: documentsRetrieved,
                statusCode: httpStatusCode
            }
        } catch (error) {
            console.error(error);
            return null;
        }

    }
}