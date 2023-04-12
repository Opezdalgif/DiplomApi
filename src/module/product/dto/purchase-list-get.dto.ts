import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PurchaseListGetDto {
    @IsOptional()
    @IsNumber({}, {message: 'Должно быть числом'})
    @Type(() => Number)
    readonly id?: number;

    @IsOptional()
    @IsString({message: 'Должно быть строкой'})
    readonly titile?: string;
}