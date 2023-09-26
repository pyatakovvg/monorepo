import { Request, BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request as ExpressRequest } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      passReqToCallback: true,
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: ExpressRequest) => {
          const data = request?.cookies[config.get('AUTH_COOKIE')];
          if (!data) {
            return null;
          }
          return data.refresh_token;
        },
      ]),
    });
  }

  async validate(@Request() req: ExpressRequest, payload: any) {
    console.log(76576576);
    if (!payload) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies['auth-cookie'];
    if (!data?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }
    const isRefreshTokenCheck = await this.authService.validateRefreshToken(payload.email, data.refreshToken);

    if (!isRefreshTokenCheck) {
      throw new BadRequestException('token expired');
    }

    return null;
  }
}
