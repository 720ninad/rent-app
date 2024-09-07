import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './shops.model';
import { ShopService } from './shops.service';
import { ShopController } from './shops.controller';

@Module({
  imports: [SequelizeModule.forFeature([Shop])],
  providers: [ShopService],
  exports: [ShopService],
  controllers: [ShopController],
})
export class ShopsModule {}
