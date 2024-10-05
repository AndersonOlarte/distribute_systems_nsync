import { Folder } from "../entities/Folder.entity";

export interface GetUserByIdOutput {
    folder: Folder;
    statusCode: number;
}

export interface ITranferredDocs {
    documents: [
        {[value: string]:string}
    ]
}