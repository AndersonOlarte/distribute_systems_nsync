import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";





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

    @ManyToOne(() => Folder, (folder) => folder.childFolders)
    parentFolder: Folder;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({
        default: true
    })
    isActived: boolean;

    @OneToMany(() => Folder, (folder) => folder.parentFolder)
    childFolders: Folder[];

}