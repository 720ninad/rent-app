import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IOrder } from './interface/orders.interface';

@Table({
  tableName: 'orders',
  freezeTableName: true,
  timestamps: true,
})
export class Order extends Model<Order> implements IOrder {
  @Column({
    field: 'order_id',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  orderId: number;

  @Column({
    field: 'from_map_location',
    type: DataType.STRING,
    allowNull: false,
  })
  fromMapLocation: string;

  @Column({
    field: 'to_map_location',
    type: DataType.STRING,
    allowNull: false,
  })
  toMapLocation: string;

  @Column({
    field: 'last_stop_map_location',
    type: DataType.STRING,
    allowNull: false,
  })
  lastStopMapLocation: string;

  @Column({
    field: 'order_status',
    type: DataType.STRING,
    allowNull: false,
  })
  orderStatus: string;

  @Column({
    field: 'payment_status',
    type: DataType.STRING,
    allowNull: false,
  })
  paymentStatus: string;

  @Column({
    field: 'product_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    field: 'buyer_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  buyerId: number;

  @Column({
    field: 'shop_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  shopId: number;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date;
}
