import {IsUUID, IsString, IsOptional, IsInt, IsEnum} from 'class-validator';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';

export class RoleGetDto {
    @IsOptional()
    @IsUUID(4, {message: 'Должен быть типа UUIDv4'})
    readonly id?: string;

    @IsOptional()
    @IsInt()
    readonly userId?: number;
    
    @IsOptional()
    @IsEnum(AccountRoleEnum)
    readonly name?: AccountRoleEnum;
}