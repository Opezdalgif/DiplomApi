import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { PurchaseListEntity } from './purchase-list.entity';

@Entity({name: 'purchaseListProduct'})
export class PurchaseListProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;
    @ManyToOne(() => ProductEntity, {onDelete:'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'productId'})
    product: ProductEntity;

    @Column()
    count: number;
    
    @Column()
    purchaseListId: number;
    @ManyToOne(() => PurchaseListEntity, {onDelete:'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'purchaseListId'})
    purchaseList: PurchaseListEntity;
}