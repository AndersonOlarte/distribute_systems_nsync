import { Request, Response } from "express";
import { DocumentService } from "../service/document.service";
import multer from "multer";
import { UserMicroservice } from "../mockServices/UserMicroservice";
import { FolderMicroservice } from "../mockServices/FolderMicroservice";


const documentService = new DocumentService();
const userMicroservice = new UserMicroservice();
const folderMicroservice = new FolderMicroservice();

export const upload = multer({});

export const uploadDocument = async (req: Request, res: Response) => {
    try {
        const userid = parseInt(req.params.userid);
        const folderid = parseInt(req.params.folderid);

        if (userMicroservice.existUser(userid)) {
            const folderResponse = await folderMicroservice.getfolderById(userid, folderid);
            if (folderResponse) {
                if(folderResponse.statusCode === 200) {
                    if(req.file) {
                        await documentService.uploadFile(req.file, userid, folderResponse.folder);
                        return res.status(201).send({
                            message: 'File Uploaded succesfully',
                        });
                    }
                }
                return res.status(404).send({
                    message: 'folder with ID: ' + folderid + 'was not found.'
                })
            }
        } 
        return res.status(500).send({mesage: 'There was an issue getting folder from database'});
    } catch (error) {
        if (error instanceof Error) {
        return res.status(500).send({message: error.message});
        }
    }
}

export const getDocumentsByFolderId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userid);
    const folderId = parseInt(req.params.folderid);
    try {
        const folderResponse = await folderMicroservice.getfolderById(userId, folderId);
        if (folderResponse && folderResponse.statusCode === 200){
            const documentfromFolder = await documentService.getDocumentsByFolder(folderResponse.folder);
            return res.status(200).send({
                message: 'Documents from folder with ID: ' + folderId,
                documents: documentfromFolder
            })
        }
        return res.status(404).send({
            message: 'there is not folder with ID: ' + folderId
        })
    } 
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'internal server error'
        })
    }
}

export const deleteUserDocuments = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userid);
    try {
        await documentService.DeleteUserDocumentsFromBucket(userId);
        return res.status(200).send({
            message: 'documents deleted succesfully'
        })
    } catch (error) {
        console.error('there was an error ', error);
        return res.status(500).send({
            message: 'there was an error deleting document'
        })
    }
}