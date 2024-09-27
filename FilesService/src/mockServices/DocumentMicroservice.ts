import fetch from "node-fetch";
import { GetDocumentsByFolderId } from "../helpers/DocumentMicroservice.types";

export class DocumentMicroservice {


    async getDocumentsByFolderId(userid: number, folderid: number): Promise<GetDocumentsByFolderId | null> {
        const documentMicroserviceURL = `http://localhost:3000/v1/users/${userid}/folders/${folderid}/documents`
        
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
}