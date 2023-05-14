
import { SupplierEntity } from "src/module/supplier/enities/supplier.entity";
import { BaseEntity , Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity({name: 'product'})
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false})
    name: string;
    
    @Column("float",{nullable: false})
    priceCHY: number;
    
    @Column("float",{nullable: false})
    priceRu: number;

    @Column("float",{nullable: false})
    priceDelevery: number;

    @Column("float",{nullable: false})
    length : number;

    @Column("float",{nullable: false})
    width : number;

    @Column("float",{nullable: false})
    height: number;

    @Column({nullable: false})
    icon: string;

    @Column()
    supplierId: number;
    @ManyToOne(() => SupplierEntity, (supplier) => supplier.products,{onDelete:'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'supplierId'})
    supplier: SupplierEntity;
       
}