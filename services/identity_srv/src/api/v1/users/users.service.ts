import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';

export interface IUserFindAllParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  hashPassword(password: string) {
    const md5Hasher = createHmac('sha512', this.config.get('PASSWORD_SALT'));
    return md5Hasher.update(password).digest('hex');
  }

  findAll(params: IUserFindAllParams) {
    return this.prisma.user.findMany({
      select: {
        uuid: true,
        email: true,
        isBlocked: true,
        createdAt: true,
        updatedAt: true,
        roles: {
          include: {
            permissions: true,
          },
        },
        claims: true,
        person: true,
      },
      where: params.where,
      skip: params.skip,
      take: params.take,
      cursor: params.cursor,
      orderBy: params.orderBy,
    });
  }

  findOne(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirstOrThrow({
      select: {
        uuid: true,
        email: true,
        isBlocked: true,
        createdAt: true,
        updatedAt: true,
        roles: {
          include: {
            permissions: true,
          },
        },
        claims: true,
        person: true,
      },
      where,
    });
  }

  create(data: UserCreateDto) {
    return this.prisma.user.create({
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        claims: true,
        person: true,
        refreshToken: true,
      },
      data: {
        email: data.email,
        password: this.hashPassword(data.password),
        roles: {
          connect: data.roles.map((role) => ({ code: role })),
        },
        claims: {
          create: data.claims,
        },
        person: {
          create: data?.person,
        },
      },
    });
  }

  update(uuid: string, data: UserUpdateDto) {
    return this.prisma.user.update({
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
        claims: true,
        person: true,
      },
      where: {
        uuid,
      },
      data: {
        email: data.email,
        roles: {
          connect: data.roles ? data.roles.map((role) => ({ code: role })) : undefined,
        },
        claims: {
          upsert: data?.claims,
        },
        person: {
          create: data?.person,
        },
      },
    });
  }
}
