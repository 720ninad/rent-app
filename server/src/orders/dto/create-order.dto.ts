import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  fromMapLocation: string;

  @IsNotEmpty()
  @IsString()
  toMapLocation: string;

  @IsNotEmpty()
  @IsString()
  lastStopMapLocation: string;

  @IsNotEmpty()
  @IsEnum(['pending', 'completed', 'canceled'])
  orderStatus: 'pending' | 'completed' | 'canceled';

  @IsNotEmpty()
  @IsEnum(['paid', 'unpaid'])
  paymentStatus: 'paid' | 'unpaid';

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  buyerId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  shopId: number;

  @IsOptional()
  @IsDate()
  orderDate?: Date;
}
