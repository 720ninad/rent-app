import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser } from './interface/user.interface';

@Table({
  tableName: 'users',
  freezeTableName: true,
  timestamps: true,
})
export class User extends Model<User> implements IUser {
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userId: number;

  @Column({
    field: 'first_name',
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    field: 'last_name',
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

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
    allowNull: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    field: 'user_address',
    type: DataType.STRING,
    allowNull: false,
  })
  userAddress: string;

  @Column({
    field: 'is_shop_enabled',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isShopEnabled: boolean;

  @Column({
    field: 'account_password',
    type: DataType.STRING,
    allowNull: false,
  })
  accountPassword: string;

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
