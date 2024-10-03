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

    @ManyToOne(() => Folder, (folder) => folder.documents,  { onDelete: "CASCADE" })
    folder: Folder;

    @ManyToOne(()=> User, (user) => user.documents, { onDelete: "CASCADE" })
    owner: User;
}