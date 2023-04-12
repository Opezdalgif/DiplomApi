import { 
    Injectable, 
    Logger,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException

} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersEntity } from '../enities/users.enities';

import { UserGetDto } from '../dto/user-get.dto';
import * as bcrypt from 'bcryptjs';
import * as generator from 'generate-password'
import { UserGenerateDto } from '../dto/user-generate.dto';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';
import { UserChangePasswordDto } from '../dto/user-change-password.dto';
import { UserChangeRoleDto } from '../dto/user-change-role.dto';

@Injectable()
export class UsersService {
    
    private logger = new Logger('USER-SERVICE');

    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity> ,
 
    ){}

    /**
     * Создание пользователя
     * 
     * @param dto
     * @returns
     * 
     */
    
    async create(dto: CreateUserDto, roles: AccountRoleEnum = AccountRoleEnum.User) {
        const passwordHash = await bcrypt.hash(dto.passwordHash, 5)
        const user = await this.usersRepository.create({
            ...dto, 
            passwordHash: passwordHash,
            role: roles,
        })
        
        try {
            await user.save();
            return user;
        } catch (err) {
            this.logger.error(`Произошла ошибка ${err}`)
            throw new InternalServerErrorException('Ошибка создания пользователя')
        }

        
    }

    /**
     * Получение всех пользователей
     * 
     * @returns 
     */

    async findAll(){
        return this.usersRepository.find({
            select: {
                id: true, 
                email:true,
                firstName: true,
                lastName: true,
                role: true
            } 
        })
    }

    /**
     * Поиск пользователя 
     * 
     * @param id
     * @returns
     * 
     */

    async find(whereDto: UserGetDto){
        return await this.usersRepository.findOne({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true
            },
            where: whereDto,
        })
    }

    async findPassword(whereDto: UserGetDto) {
        const user =  await this.usersRepository.findOneBy(whereDto)

        if(!user) {
            throw new InternalServerErrorException('Такого пользователя не существует')
        }
        
        return user;
    }
    /**
     * Получение и проверка на существование
     * 
     * @param whereDto
     * @returns
     * 
     */

    async getExists(whereDto: UserGetDto) {
        const user = await this.usersRepository.findOne({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true
            },
            where: whereDto,
        })

        if(!user) {
            throw new InternalServerErrorException('Пользователь не найден')
        }
        return user;
    }
   
    /**
     * Обноваление пользователя
     * 
     * @param id
     * @param dto
     * @returns
     * 
     */

    async update(id: number , dto: UpdateUserDto) {
        const user = await this.getExists({id: id})

        for(let key in dto) {
            user[key] = dto[key]
        }
        
        try{
            await user.save()
        } catch(e) {
            this.logger.error(`Ошибка в обноваление пользователя: ${e}`)
            throw new InternalServerErrorException('Ошибка в обновление пользователя')
        }
    }

    async remove(userId: number) {
        const user = await this.getExists({id: userId})

        try {
            await user.remove()
        } catch (e) {
            this.logger.error(`Ошибка в удаление пользователя ${e}`)
            throw new InternalServerErrorException('Ошибка в удаление пользователя')
        }

    }

    async changePassword(where: UserGetDto, dto: UserChangePasswordDto) {
        const user = await this.findPassword(where)

        if(!(await this.comparePassword(user, dto.oldPassword))) {
            throw new InternalServerErrorException('Пароль неверный')
        }

        const password = await bcrypt.hash(dto.password,5)

        try {
            user.passwordHash = password
            user.save()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Произошла ошибка в обноваление пароля')
        }
    }

    async comparePassword(user: UsersEntity, password: string) {
        try {
            return await bcrypt.compare(password, user.passwordHash);
        } catch (e) {
            this.logger.error(
                `Ошибка проверки правильности пароля пароля: ${e}`,
            );
            throw new InternalServerErrorException(
                'Ошибка проверки правильности пароля',
            );
        }
    }

    async generateUser(generateDto: UserGenerateDto) {
        const password = await generator.generate({
            length: 10,
            numbers: true
        })
        this.logger.log(`Ваш пароль: ${password}`)

        const user = await this.find({email: generateDto.email})
        if(user) {
            throw new InternalServerErrorException('Пользователь с таким email уже есть')
        }
        
        await this.create({
            email: generateDto.email,
            firstName: generateDto.firstName,
            lastName: generateDto.lastName,
            passwordHash: password
        })

        return {email: generateDto.email, password: password}
    }
}
