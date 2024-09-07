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
import { ShopService } from './shops.service';
import { Shop } from './shops.model';
import { CreateShopDto } from './dto/crete-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto): Promise<Shop> {
    try {
      return await this.shopService.create(createShopDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating shop');
    }
  }

  @Get()
  async findAll(): Promise<Shop[]> {
    try {
      return await this.shopService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error retrieving shops');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Shop> {
    try {
      return await this.shopService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Error retrieving shop');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateShopDto: UpdateShopDto,
  ): Promise<Shop> {
    try {
      return await this.shopService.update(id, updateShopDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error, 'Error updating shop');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.shopService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting shop');
    }
  }
}
