import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsGetDto } from './dto/statistics-get.dto';
import { StatisticsCreateDto } from './dto/statistics-create.dto';


@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly statisticsService: StatisticsService
    ){}

    @Post('create')
    async create(
        @Body() dto: StatisticsCreateDto
    ){
        return this.statisticsService.create(dto.month, dto.year, dto.purchase)
    }

    @Get('find')
    async find(
        @Query() dto: StatisticsGetDto
    ){ 
        return this.statisticsService.find(dto)
    }

    
}
