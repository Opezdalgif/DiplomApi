import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductUpdateDto } from '../dto/poduct-update.dto';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductGetDto } from '../dto/product-get.dto';
import { ProductEntity } from '../enities/product.entity';
import * as CC from 'currency-converter-lt'
import { response } from 'express';
import { FilesService } from 'src/module/files/files.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ProductService {
    private readonly logger: Logger = new Logger('PRODUCT-SERVICE');
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,

        private readonly fileService: FilesService
    ){}


    @Cron(CronExpression.EVERY_12_HOURS)
    async updatePrice() {
        this.logger.log('Функция обновления стоимости началась')
        let priceRub;
        const product = await this.findAll()

        for(let products of product) {
            
            await this.getConverter(Number(products.priceCHY), Number(products.priceDelevery)).then(resp => 
               priceRub = resp
            )
            
            products.priceRu = Math.round(priceRub);
            try {
                await products.save()
            } catch(e) {
                this.logger.error(e)
                throw new BadRequestException(`Произошла ошибка в обновлении стоимости оборудования`)
            }
            
        }
    }
    
     /**
     * Конвертор валют
     * @param count 
     * @returns 
     */
    async getConverter(count: number, delivery: number){
        
        let yuan = await axios.get(
            `https://api.currencyscoop.com/v1/latest?base=CNY&symbols=RUB&api_key=62a62183641bea075b240e1da94dabae`,
        );
        
        let price = (yuan.data.response.rates['RUB'] * count) + delivery;
        return price
    }
    /**
     * Создание продукта
     * @param createDto 
     * @returns 
     */
    
    async create(createDto: ProductCreateDto, icon: any){
        let priceRub;
        const iconPath = await this.fileService.create(icon)
        await this.getConverter(Number(createDto.priceCHY), Number(createDto.priceDelevery)).then(resp => 
            priceRub = (Math.round(resp))
        )
        const product = await this.productRepository.create({
            name: createDto.name,
            priceCHY: Number(createDto.priceCHY),
            priceRu: priceRub,
            priceDelevery: Number(createDto.priceDelevery),
            length: Number(createDto.length),
            width: Number(createDto.width),
            height: Number(createDto.height),
            icon: iconPath,
            supplierId: Number(createDto.supplierId)
        })
        
        try {
            await product.save()
       } catch (e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Произошла ошибка в создании продукта')
       }
    }

    /**
     * Поиск по параметрам
     * @param whereDto 
     * @returns 
     */

    async find(whereDto: ProductGetDto) {
        return this.productRepository.findOneBy(whereDto)
    }
    
    /**
     * Вывод всех товаров
     * @returns 
     */
    
    async findAll() {
        return this.productRepository.find({
           relations: {
                supplier: {}
           } 
        });
    }

    async getExists(whereDto: ProductGetDto) {
        const product = this.find(whereDto)

        if(!product) {
            throw new NotFoundException('Товара не существует или был ранее удален')
        }

        return product
    }
    
    /**
     * Обновление товаров
     * @param productId 
     * @param updateDto 
     * @returns
     */

    async update (productId: number, updateDto: ProductUpdateDto) {
        const product = await this.getExists({id:productId})

        for( let key in updateDto) {
            product[key] = updateDto[key];
        }
        try {
            await product.save()
        } catch(e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка обновления товара')
        }
    }

    /**
     * Удаление товаров 
     * @param productId 
     * @returns
     */

    async remove(productId: number) {
        const product = await this.getExists({id:productId})

        try {
            await product.remove()
        } catch(e) {
            this.logger.error(`Ошибка: ${e}`)
            throw new InternalServerErrorException('Ошибка удаление товара')
        }
    }
}
