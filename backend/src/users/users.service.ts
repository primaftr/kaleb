import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: { email: string; password: string; name: string }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });
  }

  async save(user: any) {
    return this.prisma.user.update({
      where: { email: user.email },
      data: user,
    });
  }

  async update(user: any) {
    return this.prisma.user.update({
      where: { email: user.email },
      data: user,
    });
  }
}
