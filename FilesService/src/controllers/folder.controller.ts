import { Request, Response } from "express";
import { FolderService } from "./services/folder.service";


const folderService = new FolderService();

export const createFolder = async (req: Request, res: Response) => {
    try {
        const folderName: string = req.body?.name;
        const parentFolderId: number = parseInt(req.body?.parentFolderId);

        const newFolder = await folderService.createNewFolder(folderName, parentFolderId);
        res.status(201).send({response:{
            message: 'folder created successfully',
            folder: newFolder
        }});
        
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).send({message: 'There was an error trying to create a new folder'});
        }
    }
}

export const getChildFolders = async (req: Request, res: Response) => {
    try {
        console.log('childfolders');
        const folderId = parseInt(req.params?.id);
        if (folderId) {
            const childFolders = await folderService.getChildFolders(folderId);
            res.status(200).send({
                message: 'query succesfully',
                childfolders: childFolders
            })
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).send({message: 'There was an error trying to get child folders'});
        }
    }
}