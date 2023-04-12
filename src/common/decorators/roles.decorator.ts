
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AccountRoleEnum } from '../enums/account-role.enum';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RolesGuard } from '../guards/roles.guard';


export const ROLES_KEY = 'roles';

export const Roles = (...roles: AccountRoleEnum[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(AccessTokenGuard),
        UseGuards(RolesGuard)
    );
};