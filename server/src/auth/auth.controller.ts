import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; accountPassword: string },
  ): Promise<{ isLoggedIn: boolean; token: string }> {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.accountPassword,
      );
      if (!user) {
        return { isLoggedIn: false, token: '' };
      }
      return this.authService.login(user);
    } catch (error) {
      throw new error();
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
