import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from './enities/statistics.enities';
import { Repository } from 'typeorm';
import { StatisticsGetDto } from './dto/statistics-get.dto';
import { StatisticsCreateDto } from './dto/statistics-create.dto';


@Injectable()
export class StatisticsService {
    private readonly logger: Logger = new Logger('STATISTICS-SERVICE');
    constructor( 
        @InjectRepository(StatisticsEntity)
        private readonly statisticsRepository: Repository<StatisticsEntity>
    ){}

    async create(dto: StatisticsCreateDto) {
        let statistics = await this.statisticsRepository.create({
            month: dto.month,
            year: dto.year,
            purchase: dto.purchase
        });

        try { 
            await statistics.save()
        } catch (e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в записи статистики`)
        }

    }

    async find(whereDto: StatisticsGetDto) {
        return this.statisticsRepository.find({
            select: {
                id: true,
                month: true,
                year: true,
                purchase: true
            },
            where: whereDto
        })
    }
}
