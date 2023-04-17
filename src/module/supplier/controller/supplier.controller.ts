import { 
    Body, 
    Controller, 
    Post, 
    UploadedFile, 
    UseInterceptors,
    Get , 
    Query, 
    UseGuards, 
    UsePipes,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { SupplierService } from '../service/supplier.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupplierCreateDto } from '../dto/create-supplier.dto';
import { SupplierGetDto } from '../dto/get-supplier.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { SupplierUpdateDto } from '../dto/supplier-update.dto';


@Controller('supplier')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class SupplierController {
    constructor(
        private readonly supplierService: SupplierService
    ){}
    
    @Post('/create')
    @UseInterceptors(FileInterceptor(`icon`))
    async create(@Body() dto: SupplierCreateDto, @UploadedFile() icon){
        return this.supplierService.create(dto, icon);
    }

    @Get('/get')
    async find(@Query() dto: SupplierGetDto){
        return this.supplierService.find(dto)
    }

    @Get('/getAll')
    async findAll() {
        return this.supplierService.findAll()
    }

    @Patch('/update/:supplierId')
    async update(@Param('supplierId') supplierId: number,@Body() dto: SupplierUpdateDto){
        return this.supplierService.update(supplierId,dto)
    }

    @Delete('/remove/:supplierId')
    async delete(@Param('supplierId') supplierId: number){
        return this.supplierService.remove(supplierId)
    }
}
