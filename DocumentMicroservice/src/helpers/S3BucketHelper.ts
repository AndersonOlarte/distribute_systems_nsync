import { PutObjectCommand, 
    PutObjectCommandInput, 
    S3Client, 
    DeleteObjectsCommandInput,
    ObjectIdentifier,
    DeleteObjectsCommand
} from "@aws-sdk/client-s3";
import { Folder } from "../entities/Folder.entity";


export async function s3UploadFile(fileToUpload: Express.Multer.File, userid: string, folder: Folder) {
try {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials:{
            accessKeyId: process.env.ACCESS_KEY_ID || '',
            secretAccessKey:process.env.SECRET_KEY || '',
        }
    });
    const putObjectCommandInput: PutObjectCommandInput = {
        Bucket: process.env.BUCKET_NAME,
        Body: fileToUpload.buffer,
        Key: `${userid}${folder.path}/${fileToUpload.originalname}`,
    };
    const s3Rresponse = await s3Client.send(new PutObjectCommand(putObjectCommandInput))
    
    return s3Rresponse.$metadata.httpStatusCode;
} catch (error) {
    console.error('there was an error trying to upload a file into the bucket:', error);
    return 500;
}
}

export async function s3DeleteFiles(s3FileKeys: string[]) {
    const objectsToBeDeleted: ObjectIdentifier[] = [];
    try {
        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials:{
                accessKeyId: process.env.ACCESS_KEY_ID || '',
                secretAccessKey:process.env.SECRET_KEY || '',
            }
        });
        s3FileKeys.map((key) => {
            objectsToBeDeleted.push({
                Key: key
            })
        })
        const deleteCommandInput: DeleteObjectsCommandInput = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: objectsToBeDeleted
            }
        }
        const s3Rresponse = await s3Client.send( new DeleteObjectsCommand(deleteCommandInput));
        return s3Rresponse.$metadata.httpStatusCode;
    } catch (error) {
        console.error('there was an error trying to delete files into the bucket:', error);
        return 500;
    }


}