import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
