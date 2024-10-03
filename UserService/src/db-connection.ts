import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Folder } from "./entities/Folder.entity";
import { Document } from "./entities/Document.entity";

const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'govcarpeta',
    host: 'a3f45e12c525d49cfb8872155447f43b-1061106432.us-east-1.elb.amazonaws.com',
    username: 'postgres',
    password: 'clave123',
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

export const userRepository = AppDataSource.getRepository(User);
