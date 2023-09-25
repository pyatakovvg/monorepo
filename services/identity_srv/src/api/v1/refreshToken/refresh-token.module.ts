import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, PrismaService],
})
export class RefreshTokenModule {}
