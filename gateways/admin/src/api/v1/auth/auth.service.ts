import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Fetch } from '@helper/fetch';

import * as moment from 'moment';
import { generate } from 'rand-token';
import { plainToInstance } from 'class-transformer';

import { UserEntity } from './entities/user.entity';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  generateAccessToken(user: any): Promise<string> {
    const payload = { user, sub: user.uuid };
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: any) {
    const token = await this.refreshTokenRepository.createRefreshToken(user.uuid);
  }

  resolveRefreshToken() {}

  createAccessTokenFromRefreshToken() {}

  decodeRefreshToken() {}

  getUserFromRefreshTokenPayload() {}

  getStoredTokenFromRefreshTokenPayload() {}

  async validateUser(email: string, password: string): Promise<any> {
    const fetch = new Fetch({
      baseURL: this.config.get('API_IDENTITY_SRV'),
    });

    return plainToInstance(
      UserEntity,
      await fetch.send({
        url: '/users/check',
        method: 'post',
        data: {
          email,
          password,
        },
      }),
    );
  }

  public async getRefreshToken(userUuid: string): Promise<string> {
    const fetch = new Fetch({
      baseURL: this.config.get('API_IDENTITY_SRV'),
    });

    const userDataToUpdate = {
      token: generate(64),
      expire: moment().day(1).format('YYYY-MM-DDThh:mm:ss.SSSZ'),
    };

    await fetch.send({
      url: '/refresh-token',
      method: 'post',
      data: {
        userUuid,
        ...userDataToUpdate,
      },
    });

    return userDataToUpdate.token;
  }

  async validateRefreshToken(userUuid: string, token: string) {
    console.log(userUuid, token);
    return true;
  }

  async login(user: any) {
    const payload = { user, sub: user.uuid };
    const refreshToken = await this.getRefreshToken(user.uuid);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }
}
