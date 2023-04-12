import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from '../enities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(SupplierEntity)
        private  supplierRepository: Repository<SupplierEntity>
    ){}

    async create() {
        
    }
}
