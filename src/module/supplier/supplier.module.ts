import { Module, forwardRef } from '@nestjs/common';
import { SupplierService } from './service/supplier.service';
import { SupplierController } from './controller/supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './enities/supplier.entity';
import { ProductEntity } from '../product/enities/product.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, ProductEntity]),
    forwardRef(() => FilesModule)
  ],
  providers: [SupplierService],
  controllers: [SupplierController]
})
export class SupplierModule {}
