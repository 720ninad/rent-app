import {
  IsEmail,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { IUser } from 'src/user/interface/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @IsString()
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @MaxLength(15, { message: 'First name can be at most 15 characters long' })
  firstName: string;

  @IsString()
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @MaxLength(15, { message: 'Last name can be at most 15 characters long' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  accountPassword: string;

  @IsString()
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  @MaxLength(20, { message: 'Phone number can be at most 20 characters long' })
  phoneNumber: string;

  @IsString()
  @MinLength(5, { message: 'Address must be at least 5 characters long' })
  userAddress: string;

  @IsBoolean()
  isShopEnabled: boolean;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
