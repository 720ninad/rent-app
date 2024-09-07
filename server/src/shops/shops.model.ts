import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IShop } from './interface/shops.interface';

@Table({
  tableName: 'shops',
  freezeTableName: true,
  timestamps: true,
})
export class Shop extends Model<Shop> implements IShop {
  @Column({
    field: 'shop_id',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  shopId: number;

  @Column({
    field: 'owner_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @Column({
    field: 'shop_name',
    type: DataType.STRING,
    allowNull: false,
  })
  shopName: string;

  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    field: 'phone_number',
    type: DataType.STRING,
  })
  phoneNumber: string;

  @Column({
    field: 'map_location',
    type: DataType.STRING,
    allowNull: false,
  })
  mapLocation: string;

  @Column({
    field: 'shop_type',
    type: DataType.STRING,
    allowNull: false,
  })
  shopType: string;

  @Column({
    field: 'shop_description',
    type: DataType.STRING,
    allowNull: false,
  })
  shopDescription: string;

  @Column({
    field: 'city',
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    field: 'country',
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

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
