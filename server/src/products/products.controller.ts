import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating product');
    }
  }

  @Get('get-all-products')
  async findAll(): Promise<Product[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error retrieving products',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Error retrieving product');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Error updating product');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.productService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Error deleting product');
    }
  }
}
