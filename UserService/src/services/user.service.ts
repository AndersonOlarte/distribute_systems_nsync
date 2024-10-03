import { userRepository } from "../db-connection";
import { User, UserInput } from "../entities/User.entity";
import { DocumentMicroservice } from "../helpers/DocumentMicroservice";
import { FolderMicroservice } from "../helpers/folder.microservice";
import { IFolderItem } from "../helpers/FolderMicroservices.types";




export class UserService {

    folderMicroservice: FolderMicroservice;
    documentMicroservice: DocumentMicroservice;
    constructor() {
        this.folderMicroservice = new FolderMicroservice();
        this.documentMicroservice = new DocumentMicroservice();
    }
    
    async deleteUserById(userId: number) {
        try {
            
            const documentServiceResponse = await this.documentMicroservice.deleteDocumentsByUserId(userId);
            const deleteResult = await userRepository.delete({
                id: userId
            });
            if (deleteResult.affected) return true;
            return false;
        } catch (error) {
            console.error('there was an error deleting a user; ',error);
        }
    }

    async createNewUser(userInput: UserInput) {
        try {
            const newUser = new User();
            newUser.name = userInput.name;
            newUser.age = userInput.age || 0;
            newUser.email = userInput.email;
            newUser.identification = userInput.identification || '';
            newUser.govCarpetaId = userInput.govCarpetaId;
            await newUser.save();
            const wasUserCreated = await this.folderMicroservice.createRootFolder(newUser.id);
            console.log('ws user created',wasUserCreated);
            if (wasUserCreated) return newUser;
            return null;

        } catch (error) {
            console.log('There was an error trying to create a new user', error);
            return null;
        }
    }
    async tranferUserDocuments(userid:number, transferURL: string): Promise<boolean | null> {
        try {
            const user = await userRepository.findOne(
                {
                    relations: {
                        documents: true,
                    },
                    where: {
                        id: userid
                    }
                }
            );
            console.log('user', user?.documents);
            if (user) {
                interface IDocumentList  {
                    [index: string]: string[]
                }
                let documentList: IDocumentList = {}; 
                user.documents.map((doc, index) => {                    
                    const documentIndex: string = `Document${index+1}`;
                    documentList[documentIndex] = [`${process.env.BUCKET_URL}/${doc.url}`]
                })
                const transferDocsBody = {
                    id: user.govCarpetaId,
                    citizenName: user.name,
                    citizenEmail: user.email,
                    Documents: documentList
                }
                console.log(transferDocsBody);
                fetch(transferURL, {
                    method: 'POST',
                    body: JSON.stringify(transferDocsBody)
                });
                return true;
            }
            return null;
        } catch (error) {
            console.error('there was an error trying to get user docs', error);
            return null;
        }
    };

    async getRootFolderContent(userid: number) {
        try {
            const user = await userRepository.findOne({
                relations: {
                    folders: true
                },
                where:{
                    id: userid
                }
            });
            if (user) {
                const rootFolder = user.folders.find((folder) => folder.isRootFolder === true);
                if (rootFolder) {
                    const getFolderContent: IFolderItem[] = await this.folderMicroservice.getFolderContent(rootFolder);
                    console.log(getFolderContent);
                    return getFolderContent;
                }
                console.log('there was not root folder');
                return null;
            }
        } catch (error) {
            console.log('there was an error trying to get the root folder', error);
            return null;
        }
    }

}