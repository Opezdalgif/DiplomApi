import { IsNotEmpty, IsNumber } from "class-validator";

export class StatisticsGetDto {
    @IsNumber({},{message: 'Месяц должен быть числом'})
    
    readonly month?: number

    @IsNumber({},{message: 'Год должен быть числом'})
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    readonly year: number
}