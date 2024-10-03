
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "identification" VARCHAR(20) NOT NULL UNIQUE,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50) NOT NULL,
    "age" INT NOT NULL,

)

CREATE TABLE IF NOT EXISTS "Document" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "filename" VARCHAR(200) NOT NULL,
    "url" TEXT NOT NULL,
    "owner" INT NOT NULL,
    "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActived" BOOLEAN NOT NULL DEFAULT TRUE,
    "folder" SERIAL NOT NULL
    FOREIGN KEY ("owner") REFERENCES "User"("id")
);

import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "./Folder.entity";
import { User } from "./User.entity";

@Entity('Document')
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    filename: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({default: true})
    isActived: boolean;

    @ManyToOne(() => Folder, (folder) => folder.documents, {cascade: true, nullable: true})
    folder: Folder;

    @ManyToOne(()=> User, (user) => user.documents, {cascade: true , nullable: true})
    owner: User;
}
