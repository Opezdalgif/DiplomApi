import { Controller , UploadedFile,UseInterceptors} from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UseGuards, UsePipes , Query} from '@nestjs/common/decorators';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { ProductUpdateDto } from '../dto/poduct-update.dto';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductGetDto } from '../dto/product-get.dto';
import { ProductService } from '../services/product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}
    
    @Post('/create')
    @UseInterceptors(FileInterceptor(`icon`))
    create(@Body() dto: ProductCreateDto, @UploadedFile() icon) {
        return this.productService.create(dto,icon);
    }

    @Get('/get')
    find(@Query() dto: ProductGetDto){
        return this.productService.find(dto)
    }

    @Get('/getAll')
    findAll() {
        return this.productService.findAll()
    }

    @Patch('/update/:productId')
    update(@Param('productId') productId: number, @Body() dto: ProductUpdateDto) {
        return this.productService.update(productId, dto)
    }

    @Delete('/delete/:productId')
    delete(@Param('productId') productId: number) {
        return this.productService.remove(productId)
    }
}
