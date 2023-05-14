import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseListEntity } from '../product/enities/purchase-list.entity';
import { ProductModule } from '../product/product.module';
import { OfferController } from './controller/offer.controller';
import { OfferService } from './service/offer.service';
import { OfferPurchaseService } from './service/offer-purhase.service';
import { StatisticsModule } from 'src/module/statistics/statistics.module';
import { OfferSupplierService } from './service/offer-supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseListEntity]), ProductModule, StatisticsModule],
  controllers: [OfferController],
  providers: [OfferService, OfferPurchaseService, OfferSupplierService],
  exports: [OfferSupplierService]
})
export class OfferModule {}
