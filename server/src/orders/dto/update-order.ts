import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsPositive,
  IsDate,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  fromMapLocation?: string;

  @IsOptional()
  @IsString()
  toMapLocation?: string;

  @IsOptional()
  @IsString()
  lastStopMapLocation?: string;

  @IsOptional()
  @IsEnum(['pending', 'completed', 'canceled'])
  orderStatus?: 'pending' | 'completed' | 'canceled';

  @IsOptional()
  @IsEnum(['paid', 'unpaid'])
  paymentStatus?: 'paid' | 'unpaid';

  @IsOptional()
  @IsInt()
  @IsPositive()
  productId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  buyerId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  shopId?: number;

  @IsOptional()
  @IsDate()
  orderDate?: Date; // Optional field for the date of the order
}
