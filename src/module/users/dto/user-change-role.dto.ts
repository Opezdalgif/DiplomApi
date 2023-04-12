import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";

export class UserChangeRoleDto {
  
    @IsEnum(AccountRoleEnum)
    role: AccountRoleEnum
}