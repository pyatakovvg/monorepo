import { Controller, Get, Post, Query, Body } from '@nestjs/common';

import { RefreshTokenService } from './refresh-token.service';

import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshToken: RefreshTokenService) {}

  @Get()
  getToken(@Query('userUuid') userUuid: string) {
    return this.refreshToken.getToken(userUuid);
  }

  @Post()
  upsertToken(@Body() body: RefreshTokenDto) {
    return this.refreshToken.upsertToken(body);
  }
}
