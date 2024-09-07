import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productModel.create(createProductDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating product');
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error retrieving products',
      );
    }
  }

  async findOne(productId: number): Promise<Product> {
    try {
      const product = await this.productModel.findByPk(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error retrieving product');
    }
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const [affectedCount, [updatedProduct]] = await this.productModel.update(
        updateProductDto,
        {
          where: { productId },
          returning: true,
        },
      );
      if (affectedCount === 0) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error updating product');
    }
  }

  async remove(productId: number): Promise<void> {
    try {
      const deletedCount = await this.productModel.destroy({
        where: { productId },
      });
      if (deletedCount === 0) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error deleting product');
    }
  }
}
