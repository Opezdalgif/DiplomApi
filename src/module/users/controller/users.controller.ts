import { Controller  , Post , Get , Body , Param, Patch, Delete, UsePipes, UseGuards, Req, Query} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserChangePasswordDto } from '../dto/user-change-password.dto';
import { UserGenerateDto } from '../dto/user-generate.dto';
import { UserGetDto } from '../dto/user-get.dto';
import { UsersService } from '../services/users.service';
import { JwtPayload } from 'src/common/types/JwtPayload.types';

@Controller('users')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/create')
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Get('/get')
    find(@Query() dto: UserGetDto){
        return  this.userService.find(dto)
    }

    @Get('/getAll')
    findAll() {
        return this.userService.findAll()
    }

    @Patch('/:userId')
    update(@Param('userId') userId: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(userId, dto)
    }

    @Delete('/:userId')
    delete(@Param('userId') userId: number) {
        return this.userService.remove(userId)
    }

    @Post('/generate')
    generateUser(@Body() dto: UserGenerateDto) {
        return this.userService.generateUser(dto)
    }

    @Get('/getInfo')
    getInfo(@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.userService.getExists({ id: jwtPayload.userId });
    }

    @Patch('/update/password')
    changePassword(@JwtPayloadParam() jwtPayload: JwtPayload, @Body() dto: UserChangePasswordDto) {
        return this.userService.changePassword({id: jwtPayload.userId}, dto)
    }


}
