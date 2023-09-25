import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { UsersService } from './users.service';

import { UserCheckDto } from './dto/user-check.dto';
import { UserCreateDto } from './dto/user-create.dto';

import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/check')
  check(@Body() body: UserCheckDto) {
    return this.usersService.findOne({
      email: body.email,
      password: this.usersService.hashPassword(body.password),
    });
  }

  @Post()
  async create(@Body() body: UserCreateDto) {
    return plainToInstance(UserEntity, await this.usersService.create(body));
  }

  @Get()
  findAll(@Query() query: Prisma.UserWhereInput) {
    return this.usersService.findAll({
      where: query,
    });
  }
}
