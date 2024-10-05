import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "./Folder.entity";
import { Document } from "./Document.entity";


@Entity('User')
export class User extends BaseEntity {
    @Column({primary: true})
    id: string;

    @Column()
    govCarpetaId: string;

    @Column()
    identification: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column({default: false})
    transferRequest: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({default: true})
    isActived: boolean;

    @OneToMany(() => Folder, (folder) => folder.owner)
    folders: Folder[];

    @OneToMany(()=> Document, (document) => document.owner)
    documents: Document[];
}


export interface UserInput {
    identification?: string;
    name: string;
    age?: number;
    email: string;
    govCarpetaId: string;
}