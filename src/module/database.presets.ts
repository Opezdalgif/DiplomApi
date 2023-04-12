import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";

import { CreateUserDto } from "./users/dto/create-user.dto";
import { UsersService } from "./users/services/users.service";

export const DatabasePresets = async (app: INestApplication) => {
    const logger: Logger = new Logger('Database-Presets');

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const usersService: UsersService =
        app.get<UsersService>(UsersService);

    const adminAccountData: CreateUserDto = {
        firstName: configService.getOrThrow('ADMIN_FIRSTNAME'),
        lastName: configService.getOrThrow('ADMIN_LASTNAME'),
        email: configService.getOrThrow('ADMIN_EMAIL'),
        passwordHash: configService.getOrThrow('ADMIN_PASSWORD'),
    };
    if (
        !(await usersService.find({
            email: adminAccountData.email,
        }))
    ) {
        await usersService.create(adminAccountData, AccountRoleEnum.Admin);
        logger.log('Автоматическое создание аккаунта администратора успешно!');
        
    }
};
