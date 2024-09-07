import { Module } from '@nestjs/common';
import { Order } from './orders.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
