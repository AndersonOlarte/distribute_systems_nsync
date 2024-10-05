import { userRepository } from "../db-connection";
import { User, UserInput } from "../entities/User.entity";
import { DocumentMicroservice } from "../helpers/DocumentMicroservice";
import { FolderMicroservice } from "../helpers/folder.microservice";
import { IFolderItem } from "../helpers/FolderMicroservices.types";
import dotenv from 'dotenv'

dotenv.config();



export class UserService {

    folderMicroservice: FolderMicroservice;
    documentMicroservice: DocumentMicroservice;
    constructor() {
        this.folderMicroservice = new FolderMicroservice();
        this.documentMicroservice = new DocumentMicroservice();
    }
    
    async deleteUserById(userId: number) {
        try {
            await this.documentMicroservice.deleteDocumentsByUserId(userId);
            const deleteResult = await userRepository.delete({
                id: userId.toString()
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
            newUser.id = userInput.govCarpetaId;
            await newUser.save();
            const wasUserCreated = await this.folderMicroservice.createRootFolder(parseInt(newUser.id));
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
                        id: userid.toString()
                    }
                }
            );
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
                const govCarpetaResponse = await fetch("http://govcarpeta-apis-83e1c996379d.herokuapp.com/apis/unregisterCitizen", {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: user.govCarpetaId,
                        operatorId: "66ca18cd66ca9f0015a8afb3",
                        operatorName: "Nsync"
                    })
                })
                if(govCarpetaResponse.ok) {
                    fetch(transferURL, {
                        method: 'POST',
                        body: JSON.stringify(transferDocsBody)
                    });
                    user.transferRequest = true;
                    await user.save();
                    return true;
                }
                else {
                    return false;
                }
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
                    id: userid.toString()
                }
            });
            if (user) {
                const rootFolder = user.folders.find((folder) => folder.isRootFolder === true);
                if (rootFolder) {
                    const getFolderContent: IFolderItem[] = await this.folderMicroservice.getFolderContent(rootFolder);
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

    async confirmUserTransfer (userId: number) {
        const user = await userRepository.findOneByOrFail({
            id: userId.toString()
        });
        return user.transferRequest;
    }
//     async activateRequestTransfer(userid: number): Promise <boolean> {
//         const user = await userRepository.findOneBy({
//             id: userid
//         });
//         if (user) {
//             user.transferRequest = true;
//             await user.save();
//             return true;
//         }
//         console.log('there was not user with id: ', userid);
//         return false;
//     }

    async getUserById (userid: string): Promise<User | null> {
        const user = await userRepository.findOneByOrFail({
            id: userid
        })
        if (user) {
            return user;
        }
        return null;
    }
}