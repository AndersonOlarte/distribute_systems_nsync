import fetch from "node-fetch";
import { Folder } from "../entities/Folder.entity";
import dotenv from 'dotenv';

dotenv.config();

export class FolderMicroservice {
    async createRootFolder(userId: number): Promise<boolean> {
        try {
            const folderMicroserviceURL = `${process.env.FOLDER_SERVICE_URL}:${process.env.FOLDER_SERVICE_PORT}/v1/users/${userId}/folders/root-folder`;
            const folderMicroserviceReq = await fetch(folderMicroserviceURL,{
                method: 'POST',
            });
            const httpStatusCode = folderMicroserviceReq.status;
            if (httpStatusCode === 201) return true;
            return false;
        } catch (error) {
            console.error('there was an error trying to create root folder', error);
            return false;
        }
    }

    async getFolderContent(folder: Folder) {
        try {
            const folderMicroserviceURL = `${process.env.FOLDER_SERVICE_URL}:${process.env.FOLDER_SERVICE_PORT}/v1/users/${folder.owner.id}/folders/${folder.id}/content`;
            const folderMicroserviceReq = await fetch(folderMicroserviceURL);
            const httpStatusCode = folderMicroserviceReq.status;
            if (httpStatusCode === 200) {
                const folderMicroserviceRes = await folderMicroserviceReq.json() as any;
                return folderMicroserviceRes.folderContent;
            }
        } catch (error) {
            console.error('there was an error retrieving folder content',error);
            return null;
        }
    }
}