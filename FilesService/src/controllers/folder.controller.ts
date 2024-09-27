import { Request, Response } from "express";
import { FolderService } from "../services/folder.service";
import { FolderOutput } from "../entities/Folder.entity";


const folderService = new FolderService();

export const createFolder = async (req: Request, res: Response) => {
    try {
        const folderName: string = req.body?.name;
        const parentFolderId: number = parseInt(req.body?.parentFolderId);
        const newFolder = await folderService.createNewFolder(folderName, parentFolderId);
        const folderOutput = new FolderOutput(newFolder);
        res.status(201).send({
            message: 'folder created successfully',
            folder: folderOutput
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).send({
                message: 'There was an error trying to create a new folder'
            });
        }
    }
}

export const createRootFolder = async (req: Request, res: Response) => {
    try {
        const ownerId = parseInt(req.params.userid);
        if(ownerId) {
            const rootFolder = await folderService.createRootFolderForNewUser(ownerId);
            res.status(201).send({
                message: 'Root folder created successfully',
                rootFolder
            })
        }
        else {
            res.status(400).send({
                message: `user with ID: ${ownerId} does not exist`
            })
        };
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'There was an error creating root folder'
        })
    }
}

export const getChildFolders = async (req: Request, res: Response) => {
    try {
        const folderId = parseInt(req.params?.folderid);
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

export const deleteFolder = async (req: Request, res: Response) => {
    try {
        const folderId = parseInt(req.params.folderid);
        if(folderId) {
            const folderDeleteResult = await folderService.deleteFolder(folderId);
            if(folderDeleteResult) {
                return res.status(200).send({
                    message: 'Folder deleted succesfully'
                })
            };
            return res.status(500).send({
                message: 'Folder was not deleted'
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return res.status(500).send({message: 'There was an error trying to delete a folder'});
        }
    }
}

export const getFolderMetaDataById = async (req: Request, res: Response) => {
    try {
        const folderId = parseInt(req.params.folderid);
        if(folderId) {
            const folderRetrieved = await folderService.getFolderMetaDataById(folderId);           
            if (folderRetrieved) {
                const folderOutput = new FolderOutput(folderRetrieved);
                return res.status(200).send({
                    message: 'retrieve folder successfully',
                    folder: folderOutput
                });
            }
            return res.status(404).send({
                message: `There was not folder with ID: ${folderId}`,
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'there was an error trying to get the folder by ID',
            folder: {}
        });
    }
}

export const getFolderContent = async (req:Request, res: Response) => {
    const folderId = parseInt(req.params.folderid);
    const userId = parseInt(req.params.userid);

    try {
        const documentsInFolder = await folderService.getFolderContent(userId, folderId);
        res.set('Content-Type', 'application/json');
        return res.status(200).json({
            message: 'folder content',
            folderContent: documentsInFolder
        })

    } catch (error) {
        res.status(500).send({
            message: 'error getting folder content',
            foderContent: {}
        })
    }
}

