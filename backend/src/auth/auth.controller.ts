import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInfo: UserDto) {
    const user = await this.authService.validateUser(loginInfo.email, loginInfo.password);
    if (!user) {
      throw new BadRequestException('Your email or password is incorrect');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: UserDto) {
    return this.authService.register(registerDto);
  }
}
