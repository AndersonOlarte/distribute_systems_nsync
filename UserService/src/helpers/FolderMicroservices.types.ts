import { Folder } from "../entities/Folder.entity";

export interface GetUserByIdOutput {
    folder: Folder;
    statusCode: number;
}

export interface IFolderItem {
        name: string,
        type: 'Folder' | 'File',
        LastModified: Date;
    }
