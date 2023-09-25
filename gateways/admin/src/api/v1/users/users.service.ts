import { Injectable } from '@nestjs/common';

import { Fetch } from '@helper/fetch';

export type User = any;

@Injectable()
export class UsersService {
  private readonly usersFetch: Fetch = new Fetch({
    baseURL: 'http://localhost:5010',
  });

  async findOne(): Promise<User | undefined> {
    return null; // this.users.find((user) => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.usersFetch.send({
      url: '/users',
    });
  }
}
