import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  getToken(userUuid: string) {
    return this.prisma.refreshToken.findFirst({
      where: {
        userUuid,
      },
    });
  }

  upsertToken(body: RefreshTokenDto) {
    return this.prisma.refreshToken.upsert({
      where: {
        userUuid: body.userUuid,
      },
      create: {
        token: body.token,
        expire: body.expire,
        userUuid: body.userUuid,
      },
      update: {
        token: body.token,
        expire: body.expire,
      },
    });
  }
}
