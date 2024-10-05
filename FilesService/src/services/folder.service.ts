import { Folder, FolderOutput } from "../entities/Folder.entity";
import { folderRepository, userRepository } from "../db-connection";
import { User } from "../entities/User.entity";
import { UserService } from "./user.service";
import { DocumentMicroservice } from "../mockServices/DocumentMicroservice";
import { Document } from "../entities/Document.entity";
import { FolderContent } from "../helpers/folder.types";
import dotenv from 'dotenv';

dotenv.config();

export class FolderService {
    private userService = new UserService();
    private documentMicroservice: DocumentMicroservice;
        constructor() {
            this.documentMicroservice = new DocumentMicroservice();        
        }
    private async folderIdExist(folderId: number): Promise<boolean> {
        return (await this.getFolderMetaDataById(folderId) !== null);
    };

    private async hasUserRootFolder(owner: User): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                    const rootFolder = await folderRepository.findOne({
                        relations: {
                            owner: true,
                        },
                        where: {
                            owner:{
                                id: owner.id
                            },
                            isRootFolder: true
                        }
                    })
                     resolve(rootFolder !== null);
                resolve(false);
            } catch (error) {
                reject('there was an error trying to get root folder');
            }
        })
    }

    getFolderMetaDataById(folderId: number): Promise<Folder | null>  {
        return new Promise(async (resolve, reject) => {
            try {
                const folder = await folderRepository.findOne({
                    relations: {
                        owner: true,
                        parentFolder: true
                    },
                    where: {
                        id: folderId
                    }
                })
        console.info('testing creating new folder', folder);
                if (folder) {
                    resolve(folder);
                }
                reject('there is not folder with id: '+ folderId);
            } catch (error) {
                reject('there was an error getting folder by ID');
                
            }
        })
    };
    
    async createRootFolderForNewUser(userId: number): Promise<Folder> {

        return new Promise(async (resolve, reject) => {
            try {
                const owner: User | null =  await this.userService.getUserById(userId);
                if (owner) {
                    const existsRootFolder = await this.hasUserRootFolder(owner);
                    if (existsRootFolder) {
                        reject('User already has a root folder assigned');
                    }
                    else {
                        const newRootFolder = new Folder();
                        newRootFolder.owner = owner;
                        newRootFolder.name = 'root';
                        newRootFolder.level = 1;
                        newRootFolder.path = '/root';
                        newRootFolder.isRootFolder = true;
                        resolve(await folderRepository.save(newRootFolder));
                    }
                }
                reject('there was not a user with ID '+ userId );
            } catch (error) {
                console.error(error);
                reject('there was an erro trying to create root folder');
                
            }
        })
    };

    async createNewFolder(folderName:string, folderParentId: number): Promise<Folder> {
        return new Promise(async (resolve, reject) => {
            if (await this.folderIdExist(folderParentId)) {

                const parentFolder = await this.getFolderMetaDataById(folderParentId);
                if(parentFolder?.level || parentFolder?.level === 0) {
                    const newFolder = new Folder();
                    newFolder.name = folderName;
                    newFolder.level = parentFolder.level + 1;
                    newFolder.parentFolder = parentFolder;
                    newFolder.owner = parentFolder.owner;
                    newFolder.path  = `${parentFolder.path}/${folderName}`;
                    await folderRepository.save(newFolder);
                    resolve(newFolder);
                }
            }
            reject('folder parent does not exist');
        })
    }

    async getChildFolders(folderId: number): Promise<FolderOutput[]> {
        return new Promise(async (resolve, reject) => {
            if (await this.folderIdExist(folderId)) {
                const parentFolder = await this.getFolderMetaDataById(folderId);
                let childfoldersOutput: FolderOutput [] = [];
                if (parentFolder) {
                    const childFolders = await folderRepository.find({
                        relations: {
                            parentFolder: true,
                            owner: true
                        },
                        where: {
                            parentFolder: {
                                id: parentFolder.id
                            }
                        }
                    })
                    childFolders.forEach((folder) => {
                        childfoldersOutput.push(new FolderOutput(folder));
                    } )
                    resolve(childfoldersOutput);
                }
            }
            reject('There is not folder with id: ' + folderId);
        })
    }

    private async getChildFiles(userId: number, folderid: number): Promise<Document[] | null> {
        let filesInFolder: Document[] = [];
        try {
            const documentsInFolderRes = await this.documentMicroservice.getDocumentsByFolderId(userId, folderid);
            if ( documentsInFolderRes && documentsInFolderRes.statusCode === 200) {
                filesInFolder = documentsInFolderRes.documents;
            }
            return filesInFolder;
        } catch (error) {
            console.error('there was an error getting files in folder', error);
            return null;
        }
    }

    async getFolderContent(userId: number, folderId: number): Promise<FolderContent[] | null> {
        let folderContent: FolderContent[] = [];
        try {
            const filesInFolder = await this.getChildFiles(userId,folderId);
            const foldersInFolder = await this.getChildFolders(folderId);
            if(foldersInFolder) {
                foldersInFolder.forEach((folder)=> {
                    folderContent.push({
                        id: folder.id,
                        name: folder.name,
                        type: 'Folder',
                        LastModified: folder.updatedDate
                    })
                })
            }
            if (filesInFolder) {
                filesInFolder.forEach((file) => {
                    folderContent.push({
                        id: file.id,
                        name: file.filename,
                        type: 'File',
                        LastModified: file.updatedDate,
                        url: encodeURI(`${process.env.BUCKET_URL}/${file.url}`)
                    })
                })
            };
            return folderContent;
        } catch (error) {
            console.error('there was an errror getting folder content', error);
            return null;
        }

    }

    async deleteFolder(folderId: number): Promise<Boolean> {
        return new Promise (async (resolve, reject) => {
            if (await this.folderIdExist(folderId)) {
                const folderDeleteResult = await folderRepository.delete({
                    id: folderId
                }); 
                if (folderDeleteResult.affected) {
                    resolve(true);
                }
                reject('Folder was not deleted');
            }
            reject('Folder was not found');
        })
    }

    async deleteFoldersRelatedToUser(userId: number) {
        try {
            const deleteProcessResult = await folderRepository.delete({
                owner: {
                    id: userId.toString()
                }
            })
            if (deleteProcessResult.affected) return true;
            return false;
        } catch (error) {
            console.error('there was an error trying to delete folders to user');
            return false;
        }
    }

    async getRootFolderContent(userid: number): Promise<FolderContent[] | null> {
        try {
            const rootFolder = await folderRepository.findOneBy({
                owner: {
                    id: userid.toString()
                },
                isRootFolder: true
            })
            if (rootFolder) {
                let folderContent: FolderContent[] | null;
                folderContent = await this.getFolderContent(userid, rootFolder.id);
                return folderContent;
            }
            console.log('there is not root folder for userid: ', userid);
            return null;
        } catch (error) {
            console.error('there was an error trying to get root folder', error);
            return null;
        }
    }
}