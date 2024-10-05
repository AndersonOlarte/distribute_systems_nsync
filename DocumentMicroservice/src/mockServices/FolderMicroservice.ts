import fetch from "node-fetch";
import { GetUserByIdOutput } from "../helpers/FolderMicroservices.types";

export class FolderMicroservice {
    async existFolderForUser(userid: number, folderid: number): Promise<boolean> {
        try {
            const folderRetrieved = await this.getfolderById(userid, folderid);
            if (folderRetrieved) return true;
            return false;
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getfolderById(userid: number, folderid: number) {
        const folderMicroserviceURL = `${process.env.FOLDER_SERVICE_URL}:${process.env.FOLDER_SERVICE_PORT}/v1/users/${userid}/folders/${folderid}`
        try {
            const folderMicroserviceReq = await fetch(folderMicroserviceURL);
            const httpStatusCode = folderMicroserviceReq.status;
            let folderRetrieved; 
            if(httpStatusCode === 200) {
                const folderMicroserviceRes = await folderMicroserviceReq.json() as any;
                folderRetrieved = await folderMicroserviceRes.folder;
            }
            return {
                folder: folderRetrieved,
                statusCode: httpStatusCode
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}