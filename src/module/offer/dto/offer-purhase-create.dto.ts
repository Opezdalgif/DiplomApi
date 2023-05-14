import { IsNumber } from "class-validator";

export class OfferPurchaseCreateDto {
    @IsNumber({},{message: 'Должно быть числом'})
    readonly listId: number
}