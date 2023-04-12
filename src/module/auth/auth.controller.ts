import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
  
    @Post('/signIn')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/logout')
    logout(@JwtPayloadParam() jwtPayload: JwtPayload) {
        this.authService.logout(jwtPayload)
    }

    @Get('/refresh')
    @UseGuards(RefreshTokenGuard)
    refreshTokens(@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.authService.refreshTokens(jwtPayload);
    }
}
