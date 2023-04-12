import { IsNumber } from "class-validator";

export class OfferCreateDto{
    @IsNumber({},{message: 'Должно быть числом'})
    readonly listId: number
}