import { Controller, Post, Body } from '@nestjs/common';
import { OfferCreateDto } from '../dto/offer-create.dto';
import { OfferService } from '../service/offer.service';
import { OfferPurchaseCreateDto } from '../dto/offer-purhase-create.dto';
import { OfferPurchaseService } from '../service/offer-purhase.service';
import { OfferSupplierService } from '../service/offer-supplier.service';

@Controller('offer')
export class OfferController {
    constructor(
        private readonly offerService: OfferService,
        private readonly offerPurchaseService: OfferPurchaseService,
        private readonly offerSupplierService: OfferSupplierService
    ) {}

    @Post('create')
    create(@Body() dto: OfferCreateDto) {
        return this.offerService.createKp(dto);
    }

    @Post('createPurchase')
    createPurchase(@Body() dto: OfferPurchaseCreateDto) {
        return this.offerPurchaseService.createPurchaseEquipment(dto)
    }

    // @Post('createSupplier')
    // createSupplier() {
    //     return this.offerSupplierService.createOfferSupplier()
    // }
}
