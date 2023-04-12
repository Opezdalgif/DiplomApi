import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseListEntity } from '../product/enities/purchase-list.entity';
import { ProductModule } from '../product/product.module';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseListEntity]), ProductModule],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
