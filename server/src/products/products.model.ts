import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IProduct } from './interface/products.interface';

@Table({
  tableName: 'products',
  freezeTableName: true,
  timestamps: true,
})
export class Product extends Model<Product> implements IProduct {
  @Column({
    field: 'product_id',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  productId: number;

  @Column({
    field: 'product_name',
    type: DataType.STRING,
    allowNull: false,
  })
  productName: string;

  @Column({
    field: 'shop_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  shopId: number;

  @Column({
    field: 'product_type',
    type: DataType.STRING,
  })
  productType: string;

  @Column({
    field: 'product_condition',
    type: DataType.STRING,
  })
  productCondition: string;

  @Column({
    field: 'price',
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    field: 'original_purchased_date',
    type: DataType.DATE,
  })
  originalPurchasedDate: Date;

  @Column({
    field: 'original_purchasing_receipt_no',
    type: DataType.STRING,
  })
  originalPurchasingReceiptNo: string;

  @Column({
    field: 'product_description',
    type: DataType.STRING,
  })
  productDescription: string;

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
