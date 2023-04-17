import { IsNumber, IsString } from "class-validator";

export class SupplierGetDto {
    
    @IsNumber({}, {message: 'Должно быть числом'})
    id?: number;

    @IsString({message: 'Должно быть строкой'})
    name?: string;
    
}