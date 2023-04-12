import { Controller, Post, Body } from '@nestjs/common';
import { OfferCreateDto } from './dto/offer-create.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService: OfferService) {}

    @Post('create')
    create(@Body() dto: OfferCreateDto) {
        return this.offerService.createKp(dto);
    }
}
