import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "./Folder.entity";


@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

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

    @Column()
    isActived: boolean;

    @OneToMany(() => Folder, (folder) => folder.owner)
    folders: Folder[];
}