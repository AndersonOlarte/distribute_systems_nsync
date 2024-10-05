import multer, { Multer } from 'multer';
import { s3DeleteFiles, s3UploadFile } from '../helpers/S3BucketHelper';
import { Folder } from '../entities/Folder.entity';
import { Document } from '../entities/Document.entity';
import { documentRepository } from '../db-connection';
import { FolderMicroservice } from '../mockServices/FolderMicroservice';
import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream'; // Importar Readable desde el módulo correcto
import { ITranferredDocs } from '../helpers/FolderMicroservices.types';



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
        userid: string,
        folder: Folder)  {
            try {
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

    private async uploadDocumentToS3(fileToUpload: Express.Multer.File, userid: string, folder: Folder) {
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



    async uploadFile(fileToUpload: Express.Multer.File,userid: string, folder: Folder) {
        try {
            await this.uploadDocumentToS3(fileToUpload, userid, folder);
            await this.uploadDocumentToDb(fileToUpload,userid, folder);
        } catch (error) {
            console.error('there was an error trying to upload file');
        }
    }

    async getDocumentsByFolder(folder: Folder): Promise<Document[] | null> {
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

    async uploadFilesFromTransfer (documents: ITranferredDocs, userid: string) {

    const folder: Folder | null = (await this.folderMicroservice.getfolderById(userid,1))?.folder;
const downloadAndPost = async (url: string, filename: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream' // Para manejar el archivo como stream
        });
        const fileToUpload = await streamToMulterFile(response.data, filename);
 
        // Crear un form-data para el archivo
        const form = new FormData();
        form.append('file', response.data);
        form.append('filename', fileToUpload.originalname);
 
        if (folder) {
            const createDocumentResponse = this.uploadFile(fileToUpload, userid, folder);
        }
    } catch (error) {
        console.error(`Error downloading or posting document from ${url}:`, error);
    }
};
 
// Endpoint al que se enviarán los documentos
 
    // Descargar y hacer POST de cada documento en paralelo
    const postDocumentsInParallel = async () => {
        const promises: Promise<any>[]=[];
        // Crear promesas para cada documento
        documents.documents.map((docUrl, index) => {
            promises.push(downloadAndPost(Object.values(docUrl)[0], Object.keys(docUrl)[0]));
        })
        await Promise.all(promises);
    
        console.log('All documents processed in parallel');
        return true;
    };
    
    postDocumentsInParallel();

    const streamToMulterFile = async (stream: Readable, filename: string): Promise<Express.Multer.File> => {
        const chunks: Uint8Array[] = [];
        return new Promise((resolve, reject) => {
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const file: Express.Multer.File = {
              fieldname: 'file',  // Nombre del campo del archivo
              originalname: filename,  // Nombre original del archivo
              encoding: '7bit', // Encoding común, puede variar
              mimetype: 'application/pdf', // Cambia esto según el tipo de archivo
              size: buffer.length,
              buffer: buffer,  // El contenido del archivo en buffer
              stream: Readable.from(buffer),
              destination: '', // Solo se utiliza cuando es almacenamiento en disco
              filename: '', // Si se guarda en disco
              path: '' // Solo si se guarda en disco
            };
            resolve(file);
          });
          stream.on('error', reject);
        });
      };
        }

        
      
}

