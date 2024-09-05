import { DataSource } from "typeorm";
import { Document } from "./entities/Document.entity";
import { User } from "./entities/User.entity";
import { Folder } from "./entities/Folder.entity";

const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'govcarpeta',
    host: 'ec2-18-206-175-76.compute-1.amazonaws.com',
    username: 'anderson',
    password: 'anderson',
    port: 5432,
    entities: [Document, User, Folder],
    logging: true,
    synchronize: true
})

export async function startConnetionWithDb() {
    AppDataSource.initialize()
        .then(() => {})
        .catch((err)=>console.error(err));
}

export const folderRepository = AppDataSource.getRepository(Folder);

