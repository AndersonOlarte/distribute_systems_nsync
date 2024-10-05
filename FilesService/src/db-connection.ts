import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Folder } from "./entities/Folder.entity";
import { Document } from "./entities/Document.entity";
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    // host: process.env.DATABASE_HOST,
    host: 'a3f45e12c525d49cfb8872155447f43b-1061106432.us-east-1.elb.amazonaws.com',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT !== undefined ? process.env.DATABASE_PORT: '5432') ,
    entities: [User, Folder, Document],
    logging: true,
    synchronize: true
})

export async function startConnetionWithDb() {
    AppDataSource.initialize()
        .then(() => {})
        .catch((err)=>console.error(err));
}

export const folderRepository = AppDataSource.getRepository(Folder);
export const userRepository = AppDataSource.getRepository(User);
