import { Fetch } from '@helper/fetch';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client/edge';
import { ConfigService } from '@nestjs/config';

import { generate } from 'rand-token';
import * as moment from 'moment/moment';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly config: ConfigService) {}

  public async createRefreshToken(userUuid: string): Promise<string> {
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

  public async findRefreshToken(userUuid: string): Promise<RefreshToken | null> {
    const fetch = new Fetch({
      baseURL: this.config.get('API_IDENTITY_SRV'),
    });

    return await fetch.send({
      url: '/refresh-token',
      method: 'get',
      params: {
        userUuid,
      },
    });
  }
}
