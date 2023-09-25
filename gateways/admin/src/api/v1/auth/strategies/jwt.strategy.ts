import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request as ExpressRequest } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      passReqToCallback: true,
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: ExpressRequest) => {
          console.log(123);
          const data = request?.cookies[config.get('AUTH_COOKIE')];
          if (!data) {
            return null;
          }
          return data.access_token;
        },
      ]),
    });
  }

  validate() {
    console.log(8768687);
    return 56776;
  }
}
