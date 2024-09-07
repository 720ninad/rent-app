import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  shopName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  mapLocation: string;

  @IsNotEmpty()
  @IsString()
  shopType: string;

  @IsNotEmpty()
  @IsString()
  shopDescription: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  ownerId?: number; // Assuming this is optional at creation
}
