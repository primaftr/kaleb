import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserInfoDto, FindUserPayloadDto, CreateUserPayloadDto } from 'src/auth/user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
  async findUserInfo(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        email: true,
        username: true,
      },
    });
  }

  async create(user: CreateUserPayloadDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        username: user.username,
      },
    });
  }
}
