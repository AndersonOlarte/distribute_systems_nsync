import { Folder } from "../../entities/Folder.entity";
import { folderRepository } from "../../db-connection";

export class FolderService {

    getFolderById(folderId: number): Promise<Folder | null>  {
        return new Promise((resolve, reject) => {
            folderRepository.findOneBy({
                id: folderId
            })
            .then(resolve)
            .catch(reject);
        })
    }

    async folderIdExist(folderId: number): Promise<boolean> {
        return (await this.getFolderById(folderId) !== null);
    }
    
    async createNewFolder(folderName:string, folderParentId: number): Promise<Folder> {
        return new Promise(async (resolve, reject) => {
            console.log('message');
            if (await this.folderIdExist(folderParentId)) {
                const parentFolder = await this.getFolderById(folderParentId);
                if(parentFolder?.level || parentFolder?.level === 0) {
                    const newFolder = new Folder();
                    newFolder.name = folderName;
                    newFolder.level = parentFolder.level + 1;
                    newFolder.parentFolder = parentFolder;
                    resolve(folderRepository.save(newFolder));
                }
            }
            reject('folder parent does not exist');
        })
    }

    async getChildFolders(folderId: number): Promise<Folder[]> {
        return new Promise(async (resolve, reject) => {
            if (await this.folderIdExist(folderId)) {
                const parentFolder = await this.getFolderById(folderId);
                if (parentFolder) {
                    resolve(folderRepository.findBy({
                        parentFolder:parentFolder
                    }))
                }
            }
            reject('There is not folder with id: ' + folderId);
        })
    }
}