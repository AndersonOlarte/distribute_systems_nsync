import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Folder } from "./entities/Folder.entity";
import { Document } from "./entities/Document.entity";

const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'govcarpeta',
    host: 'ec2-34-229-95-132.compute-1.amazonaws.com',
    username: 'anderson',
    password: 'anderson',
    port: 5432,
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
