import { ProductEntity } from "src/module/product/enities/product.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'supplier'})
export class SupplierEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    icon: string;

    @Column({nullable: false})
    contract: string;

    @OneToMany(() => ProductEntity, (product) => product.supplier )
    products: ProductEntity[];

    
}