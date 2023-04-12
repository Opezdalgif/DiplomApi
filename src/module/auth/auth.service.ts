import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/services/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './enities/refresh-token.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/enities/users.enities';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { SessionEntity } from './enities/session.entity';
import { SessionUnavailableException } from 'src/common/exceptions/session-unavailable.exception';


@Injectable()
export class AuthService {

   private readonly logger = new Logger('AUTH-SERVICE');

    constructor(

      @InjectRepository(RefreshTokenEntity)
      private refreshTokenRepository: Repository<RefreshTokenEntity>,

      @InjectRepository(SessionEntity)
      private authSessionRepository: Repository<SessionEntity>,

        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}

    async signIn(dto: AuthDto) {
        let user: UsersEntity
        if (!(user = await this.usersService.findPassword({email: dto.email}))) {
          throw new BadRequestException('Аккаунт с указанной почтой не сущесвтует')
        }

        if(!(await this.usersService.comparePassword(user, dto.password))) {
            throw new BadRequestException('Пароль неверный')
        }
        this.logger.log(user.id)
        const tokens = await this.getTokens(user)
        return tokens;
    }

    async logout(jwtPaylod: JwtPayload) {
        const session = await this.get(
          jwtPaylod.sessionId,
      );
      await this.deactivate(session);

      return;
      }


    async getTokens(user: UsersEntity) {
      const session = await this.register(user.id);

      const jwtPayload: JwtPayload = {
          sessionId: session.id,
      };
      console.log(session.isClosed);
      
      const accessToken = await this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn:
              this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRES'),
      });

      const refreshToken = await this.jwtService.signAsync(jwtPayload, {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
              'JWT_REFRESH_EXPIRES',
          ),
      });

      return { accessToken, refreshToken };
    }

    async refreshTokens(jwtPayload: JwtPayload) {
      const session = await this.get(jwtPayload.sessionId);
      const accountId = session.userId;
      await this.deactivate(session);

      const account = await this.usersService.find({
          id: accountId,
      });
      return await this.getTokens(account);
  }

    /**
     * Регистрация сессии
     * @param accountId
     * @returns
     */
    async register(accountId: number) {
      console.log("AccountId ",accountId);
      
      let session: SessionEntity;
      try {
          session = await this.authSessionRepository.create({userId: accountId });
          await session.save();
      } catch (e) {
          this.logger.error(e);
          throw new InternalServerErrorException(`Произошла ошибка в регистрации сессии`);
      }

      return session;
  }

  /**
   * Декодировать JWT
   * @param token
   * @returns
   */
  async decodeJWT(token: string): Promise<JwtPayload> {
      return this.jwtService.decode(token) as JwtPayload;
  }

  /**
   * Проверка на существование и получение сессии
   * @param sessionId
   * @returns
   */
  async get(sessionId: number) {
 //   this.logger.log(`Я здесь`)
      console.log(`я здесь`)
      const session = await this.authSessionRepository.findOne({
          where: { id: sessionId },
          relations: {
            user: {}
          }
      });
      console.log(session)
     // this.logger.log(`Сессия ${session}`)
      if (!session || session.isClosed) {
          throw new SessionUnavailableException();
      }

      return session;
  }

  /**
   * Деактивировать сессию
   * @param session
   * @returns
   */
  async deactivate(session: SessionEntity | number) {
      if (typeof session === 'number') {
          session = await this.get(session);
      }
      session.isClosed = true;
      try {
          await session.save();
      } catch (e) {
         // this.logger.error(e);
          throw new InternalServerErrorException();
      }

      return;
  }

}    
    
    

