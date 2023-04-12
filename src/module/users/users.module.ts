import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { UsersEntity } from './enities/users.enities';

import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';

import { SessionEntity } from '../auth/enities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity ,SessionEntity ])],
  controllers:[UsersController],
  providers: [UsersService], 
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
