import { Controller } from '@library/app';

import { makeObservable, observable, action } from 'mobx';

import { HomeService } from './home.service';

@Controller()
export class HomeController {
  @observable users: any[] = [];

  private readonly homeService: HomeService = new HomeService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData() {
    this.users = await this.homeService.getData();
  }
}
