import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaService } from '@/prisma/prisma.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ConfigService],
})
export class UsersModule {}
