import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'statistics'})
export class StatisticsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column()
    purchase: string
}