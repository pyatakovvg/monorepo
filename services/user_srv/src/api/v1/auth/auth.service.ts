import { Injectable } from '@nestjs/common';

import { QueryDto } from './dto/query.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  create() {}

  findAll(query: QueryDto) {
    return this.authRepository.findMany({
      where: {
        email: query.email,
        password: query.password,
      },
      skip: query.skip,
      take: query.take,
    });
  }
}
