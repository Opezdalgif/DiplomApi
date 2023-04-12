import { IsNotEmpty, IsNumber } from "class-validator";

export class AddProductDto {
    @IsNotEmpty({message: 'Должно быть заполнено'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly productId: number;

    @IsNotEmpty({message: 'Должно быть заполнено'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly purchaseListId: number;

    @IsNumber({}, {message: 'Должно быть числом'})
    readonly count: number
}