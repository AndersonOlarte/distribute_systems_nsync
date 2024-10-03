import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Document } from "./Document.entity";





@Entity('Folder')
export class Folder extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @Column({ default: false })
    isRootFolder: boolean;

    @ManyToOne(() => Folder, (folder) => folder.childFolders,  {cascade: true, onDelete: "CASCADE" })
    parentFolder: Folder;

    @ManyToOne(() => User, (user) => {user.folders} , {cascade: true, onDelete: "CASCADE" })
    owner: User;
    
    @CreateDateColumn()
    createdDate: Date;
 
    @UpdateDateColumn()
    updatedDate: Date;

    @Column({
        default: true
    })
    isActived: boolean;

    @Column({nullable: true})
    path: string;
    
    @OneToMany(() => Folder, (folder) => folder.parentFolder)
    childFolders: Folder[];

    @OneToMany(() => Document, (document) => document.folder, {cascade: true, onDelete: "CASCADE"})
    documents: Document[];
}

export class FolderOutput {
    id: number;
    name: string;
    level: number;
    isRootFolder: boolean;
    parentFolderId: number;
    owner: User;
    path: string;
    createdDate: Date;
    updatedDate: Date;
    isActived: boolean;

    constructor (folder: Folder) {
        this.id = folder.id;
        this.name = folder.name;
        this.level = folder.level;
        this.isRootFolder = folder.isRootFolder;
        if (!folder.isRootFolder) {
            this.parentFolderId = folder.parentFolder.id;
        };
        this.path = folder.path;
        this.owner = folder.owner;
        this.createdDate = folder.createdDate;
        this.updatedDate = folder.updatedDate;
        this.isActived = folder.isActived;
    }
}

export class uploadDocumentIntoFolder {
    documentId: number;
}