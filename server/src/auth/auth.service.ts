import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser } from '../user/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    accountPassword: string,
  ): Promise<IUser | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(accountPassword, user.accountPassword))) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.userId };
    return {
      isLoggedIn: true,
      token: this.jwtService.sign(payload),
    };
  }

  async createUser(data: IUser): Promise<IUser> {
    try {
      const existingUser = await this.userService.findByEmail(data.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(data.accountPassword, 10);
      const user = await this.userService.createUser({
        ...data,
        accountPassword: hashedPassword,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating user: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
