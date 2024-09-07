import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(data: IUser): Promise<IUser> {
    try {
      const user = await this.userModel.create(data);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllUser(): Promise<IUser[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching users: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Error fetching user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new HttpException(
        'Error fetching user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, IUser[]]> {
    try {
      const result = await this.userModel.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (result[0] === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Error updating user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeUser(id: number): Promise<void> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.userModel.destroy();
    } catch (error) {
      throw new HttpException(
        'Error removing user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<IUser | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.accountPassword))) {
      return user;
    }
    return null;
  }
}
