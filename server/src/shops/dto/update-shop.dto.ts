import { IsOptional, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateShopDto {
  @IsOptional()
  @IsString()
  shopName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  mapLocation?: string;

  @IsOptional()
  @IsString()
  shopType?: string;

  @IsOptional()
  @IsString()
  shopDescription?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  ownerId?: number;
}
