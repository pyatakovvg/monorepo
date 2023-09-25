import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
