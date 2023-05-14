import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsEntity } from './enities/statistics.enities';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatisticsEntity])
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService]
})
export class StatisticsModule {}
