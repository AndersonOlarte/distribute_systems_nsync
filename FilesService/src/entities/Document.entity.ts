import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('Document')
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    filename: string;

    @Column()
    url: string;

    @Column()
    owner: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    isActived: boolean;
}