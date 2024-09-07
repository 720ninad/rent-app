import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from '../user/interface/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      throw new HttpException(
        'Error fetching users: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IUser> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Error fetching user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<[number, IUser[]]> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        'Error updating user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.userService.removeUser(id);
    } catch (error) {
      throw new HttpException(
        'Error removing user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
