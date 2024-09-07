import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  shopId: number;

  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsString()
  productCondition?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsDate()
  originalPurchasedDate?: Date;

  @IsOptional()
  @IsString()
  originalPurchaisingReceiptNo?: string;

  @IsOptional()
  @IsString()
  productDescription?: string;
}
