import { PartialType } from "@nestjs/mapped-types";
import { OfferCreateDto } from "./offer-create.dto";

export class OfferCancellationDto extends PartialType(OfferCreateDto){}