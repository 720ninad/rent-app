import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductsModule {}
