import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';

export interface IAuthRepositoryParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.AuthWhereUniqueInput;
  where?: Prisma.AuthWhereInput;
  orderBy?: Prisma.AuthOrderByWithRelationInput;
}

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(params: IAuthRepositoryParams) {
    return Promise.all([
      this.prismaService.auth.findMany({
        where: params.where,
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        orderBy: params.orderBy,
      }),
    ]);
  }
}
