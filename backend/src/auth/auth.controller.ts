import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfoDto, FindUserPayloadDto, CreateUserPayloadDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInfo: FindUserPayloadDto) {
    const user = await this.authService.validateUser(loginInfo.username, loginInfo.password);
    if (!user) {
      throw new BadRequestException('Your username or password is incorrect');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserPayloadDto) {
    return this.authService.register(registerDto);
  }
}
