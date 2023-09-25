import { Fetch } from '@/common/Fetch';

import { plainToInstance } from 'class-transformer';

import { IApplication } from './Application';
import { ApplicationRepository } from './application.repository';

import { ProfileDto } from './dto/profile.dto';

export class ApplicationService {
  private readonly _app: IApplication;
  private readonly _repository: ApplicationRepository = new ApplicationRepository();
  private readonly _fetch: Fetch = new Fetch({
    baseURL: process.env.REACT_APP_GATEWAY_API,
  });

  constructor(app: IApplication) {
    this._app = app;
  }

  getStarted(): boolean {
    return this._repository.isStarted;
  }

  setStarted(state: boolean) {
    this._repository.setStarted(state);
  }

  async signIn(email: string, password: string) {
    await this._fetch.send({
      url: '/auth/login',
      method: 'post',
      data: {
        email,
        password,
      },
    });

    await this.getProfile();
  }

  async getProfile() {
    try {
      const result = await this._fetch.send({
        url: '/auth/profile',
      });
      const profile = plainToInstance(ProfileDto, result);

      this._repository.setProfile(profile);
    } catch (e) {
      console.log(123, e);
    }
  }
}
