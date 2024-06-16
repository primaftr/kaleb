import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserPayloadDto } from 'src/auth/user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@CurrentUser() user: UserPayloadDto) {
    return this.userService.findUserInfo(user.email);
  }
}
