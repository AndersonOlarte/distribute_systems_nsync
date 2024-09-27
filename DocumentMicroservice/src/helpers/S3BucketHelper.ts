import { PutObjectCommand, PutObjectCommandInput, S3Client} from "@aws-sdk/client-s3";
import { Folder } from "../entities/Folder.entity";


export async function s3UploadFile(fileToUpload: Express.Multer.File, userid: number, folder: Folder) {
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
    const s3Rresponse = await s3Client.send(new PutObjectCommand(putObjectCommandInput));
    
    return s3Rresponse.$metadata.httpStatusCode;
} catch (error) {
    console.error('there was an error trying to upload a file into the bucket:', error);
    return 500;
}
}