import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "./Folder.entity";
import { Document } from "./Document.entity";


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

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