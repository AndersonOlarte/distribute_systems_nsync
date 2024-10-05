import multer, { Multer } from 'multer';
import { s3DeleteFiles, s3UploadFile } from '../helpers/S3BucketHelper';
import { Folder } from '../entities/Folder.entity';
import { Document } from '../entities/Document.entity';
import { documentRepository } from '../db-connection';
import { FolderMicroservice } from '../mockServices/FolderMicroservice';

export class DocumentService {

    folderMicroservice: FolderMicroservice;
    
    constructor () {
        multer({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        });
        this.folderMicroservice = new FolderMicroservice();
    }

    private async uploadDocumentToDb(
        fileToUpload:Express.Multer.File,
        userid: number,
        folder: Folder)  {
            try {
                console.log('folder data: ', folder);
                const newDocument = new Document();
                newDocument.filename = fileToUpload.originalname;
                newDocument.isActived = true;
                if (folder) {
                    newDocument.folder = folder;
                    newDocument.url = `${userid}${folder.path}/${newDocument.filename}`;
                }
                newDocument.owner = folder.owner;

                await documentRepository.save(newDocument);
            } catch (error) {
                console.error(error);
            }
    }

    private async uploadDocumentToS3(fileToUpload: Express.Multer.File, userid: number, folder: Folder) {
        try {
            const s3ResponseStatusCode = await s3UploadFile(fileToUpload, userid, folder);
            if (s3ResponseStatusCode === 201 || s3ResponseStatusCode === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('there was an error trying to upload a file into the bucket', error);            
        }
    };



    async uploadFile(fileToUpload: Express.Multer.File,userid: number, folder: Folder) {
        try {
            console.log('testing');
            await this.uploadDocumentToS3(fileToUpload, userid, folder);
            await this.uploadDocumentToDb(fileToUpload,userid, folder);
        } catch (error) {
            console.error('there was an error trying to upload file');
        }
    }

    async getDocumentsByFolder(folder: Folder): Promise<Document[] | null> {
        console.log(folder);
        try {
            return await documentRepository.find({
                relations: {
                    folder: true
                },
                where: {
                    folder: {
                        id: folder.id
                    }
                }
            }
            )
        } catch (error) {
            console.error('there was an error trying to get ', error);
            return null;
        }
    }

    async DeleteUserDocumentsFromBucket(userId: number) {
        try {
            const docsToBeDeleted = await documentRepository.findBy(
                {
                    owner: {
                        id: userId.toString()
                    }
                }
            );
            const keysToBeDeleted: string[] = [];
            docsToBeDeleted.map((document) => {
                keysToBeDeleted.push(document.url);
            })
            s3DeleteFiles(keysToBeDeleted);
        } catch (error) {
            console.error('there was an error deleting files', error);
        }
    }

    async uploadFilesFromTransfer () {
        const axios = require('axios');
const FormData = require('form-data');
 
const documents = {
    "Documents": {
        "Document1": ["http://example.com/documentFile1"],
        "Document2": ["http://example.com/documentFile2"]
    }
};
 
// Función para descargar y realizar el POST
const downloadAndPost = async (url, postEndpoint) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream' // Para manejar el archivo como stream
        });
 
        // Crear un form-data para el archivo
        const form = new FormData();
        form.append('file', response.data);
 
        // Realizar el POST request al endpoint con el archivo descargado
        const postResponse = await axios.post(postEndpoint, form, {
            headers: form.getHeaders() // Es importante para enviar los headers correctos
        });
 
        console.log(`Post response for ${url}:`, postResponse.data);
    } catch (error) {
        console.error(`Error downloading or posting document from ${url}:`, error);
    }
};
 
// Endpoint al que se enviarán los documentos
const postEndpoint = 'http://your-api-endpoint.com/upload';
 
    // Descargar y hacer POST de cada documento en paralelo
    const postDocumentsInParallel = async () => {
        const promises = [];
    
        // Crear promesas para cada documento
        Object.values(documents.Documents).forEach(docArray => {
            docArray.forEach(docUrl => {
                promises.push(downloadAndPost(docUrl, postEndpoint));
            });
        });
    
        // Ejecutar todas las promesas en paralelo
        await Promise.all(promises);
    
        console.log('All documents processed in parallel');
    };
    
    postDocumentsInParallel();
        }
}