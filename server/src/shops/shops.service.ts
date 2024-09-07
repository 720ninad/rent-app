import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from './shops.model';
import { CreateShopDto } from './dto/crete-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop)
    private readonly shopModel: typeof Shop,
  ) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    try {
      return await this.shopModel.create(createShopDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating shop');
    }
  }

  async findAll(): Promise<Shop[]> {
    try {
      return await this.shopModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error retrieving shops');
    }
  }

  async findOne(shopId: number): Promise<Shop> {
    try {
      const shop = await this.shopModel.findByPk(shopId);
      if (!shop) {
        throw new NotFoundException(`Shop with ID ${shopId} not found`);
      }
      return shop;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error retrieving shop');
    }
  }

  async update(shopId: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    try {
      const [affectedCount, [updatedShop]] = await this.shopModel.update(
        updateShopDto,
        {
          where: { shopId },
          returning: true,
        },
      );
      if (affectedCount === 0) {
        throw new NotFoundException(`Shop with ID ${shopId} not found`);
      }
      return updatedShop;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error updating shop');
    }
  }

  async remove(shopId: number): Promise<void> {
    try {
      const deletedCount = await this.shopModel.destroy({
        where: { shopId },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Shop with ID ${shopId} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error deleting shop');
    }
  }
}
