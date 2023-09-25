import {
  Body,
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { QueryDto } from './dto/query.dto';
import { AuthCreateDto } from './dto/auth-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  findAll(@Query() query: QueryDto) {
    return this.authService.findAll(query);
  }

  @Post('/')
  create(@Body() auth: AuthCreateDto) {}
}
