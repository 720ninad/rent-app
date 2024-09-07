import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderService.create(createOrderDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating order');
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error fetching orders');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    try {
      return await this.orderService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Error fetching order with ID ${id}`,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      return await this.orderService.update(id, updateOrderDto);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Error updating order with ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.orderService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        `Error deleting order with ID ${id}`,
      );
    }
  }
}
