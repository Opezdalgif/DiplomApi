import {IsEnum, IsInt, IsString, Length} from 'class-validator';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';

export class RoleCreateDto {
    @IsEnum(AccountRoleEnum)
    readonly name: AccountRoleEnum;

    @IsString({message: 'Должно быть строкой'})
    @Length(1, 120, {message: 'Должно содержать от 1 до 120 символов'})
    readonly description: string;

    @IsInt()
    readonly userId: number;
}