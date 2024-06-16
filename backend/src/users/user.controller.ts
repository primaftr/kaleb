import { Controller, Get, UseGuards } from '@nestjs/common';
import { FindUserPayloadDto } from 'src/auth/user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@CurrentUser() user: FindUserPayloadDto) {
    return this.userService.findUserInfo(user.username);
  }
}
