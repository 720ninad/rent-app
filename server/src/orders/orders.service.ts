import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderModel.create(createOrderDto);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error creating order');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Error fetching orders');
    }
  }

  async findOne(orderId: number): Promise<Order> {
    const order = await this.orderModel.findByPk(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  async update(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const [updated] = await this.orderModel.update(updateOrderDto, {
      where: { orderId },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return this.findOne(orderId); // Fetch and return the updated order
  }

  async remove(orderId: number): Promise<void> {
    const deleted = await this.orderModel.destroy({
      where: { orderId },
    });
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  }
}
