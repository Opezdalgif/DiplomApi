import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from '../enities/supplier.entity';
import { Repository } from 'typeorm';
import { SupplierCreateDto } from '../dto/create-supplier.dto';
import { FilesService } from 'src/module/files/files.service';
import { SupplierGetDto } from '../dto/get-supplier.dto';
import { SupplierUpdateDto } from '../dto/supplier-update.dto';
import { OfferSupplierService } from 'src/module/offer/service/offer-supplier.service';

@Injectable()
export class SupplierService {
    private readonly logger: Logger = new Logger('Supplier-SERVICE');
    constructor(
        @InjectRepository(SupplierEntity)
        private  supplierRepository: Repository<SupplierEntity>,

        private readonly fileService: FilesService,
        private readonly offerSupplierService: OfferSupplierService
    ){}

    async create(createDto: SupplierCreateDto, icon: any) {
        const iconPath = await this.fileService.create(icon)
        const contract = await this.offerSupplierService.createOfferSupplier(createDto.name)
        const supplier = await this.supplierRepository.create({
            name: createDto.name,
            description: createDto.description,
            contract: contract,
            icon: iconPath
        })


        try {
            await supplier.save()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка создания листа закупок')
        }
        
    }

    /**
     * Поиск по параметрам
     * @param whereDto 
     * @returns 
     */

    async find(whereDto: SupplierGetDto) {
        return await this.supplierRepository.findOne({
            select: {
                id:true,
                name: true,
                description: true,
                contract: true
            },
            where: whereDto,
            relations: {
                products: {
                }
            }
        })
    }

    /**
     * Вывод всех списков 
     * @returns 
     */

    async findAll() {
        return await this.supplierRepository.find({
            select: {
                id:true,
                name: true,
                description: true,
                contract: true,
                icon: true
            },
            relations: {
                products: {

                }
            }
        })
    }

    async getExists(whereDto: SupplierGetDto) {
        const supplier = await this.find(whereDto)
        
        if(!supplier) {
            throw new NotFoundException('Такого списка не существует или ранее он был удален')
        }

        return supplier
    }

    async update(id: number, updateDto: SupplierUpdateDto)  {
        const supplier = await this.getExists({id: id})

        for(let key in updateDto) {
            supplier[key] = updateDto[key]
        }

        try {
            await supplier.save()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка обновления списка закупок')
        }
    }

    async remove(id: number) {
        this.logger.log(id)
        const supplier = await this.getExists({id: id})
        this.logger.log(supplier)
        
        try {
            await supplier.remove()
        } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка удаление списка закупок')
        }
    }
}
