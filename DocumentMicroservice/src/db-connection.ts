import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Folder } from "./entities/Folder.entity";
import { Document } from "./entities/Document.entity";
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT !== undefined ? process.env.DATABASE_PORT: '5432') ,
    entities: [User, Folder, Document],
    logging: true,
    synchronize: false
})

export async function startConnetionWithDb() {
    AppDataSource.initialize()
        .then(() => {})
        .catch((err)=>console.error(err));
}

export const documentRepository = AppDataSource.getRepository(Document);
export const userRepository = AppDataSource.getRepository(User);
