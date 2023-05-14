import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { PurchaseListProduct } from "./purchase-list-product.entity";

@Entity({name: 'purchaseList'})
export class PurchaseListEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column()
    purchase: string

    @Column({default: false})
    download: boolean

    @ManyToMany(() => PurchaseListProduct, {onDelete:'CASCADE', onUpdate: 'CASCADE'})
    @JoinTable()
    products: PurchaseListProduct[];
}