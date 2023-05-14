import { IsNotEmpty, IsString } from "class-validator";

export class SupplierCreateDto {

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    name: string;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    description: string;

   
}