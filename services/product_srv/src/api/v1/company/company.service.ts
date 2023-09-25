import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PrismaService } from '@/prisma/prisma.service';

import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('ORDER_SERVICE') private orderSrv: ClientProxy,
    private prisma: PrismaService,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  findAll(include: string[]) {
    return this.orderSrv.send({ cmd: 'category:get_all' }, {});

    // let includes = {};
    // if (include && !!include.length) {
    //   includes = include.reduce((accum: any, currentValue: string) => {
    //     accum[currentValue] = true;
    //     return accum;
    //   }, {});
    // }
    //
    // return this.prisma.company.findMany({
    //   include: {
    //     ...(Object.keys(includes).length ? includes : {}),
    //   },
    // });
    // return new Promise((resolve) => resolve([]));
  }

  findOne(uuid: string, include: string[]): Promise<CompanyEntity> {
    let includes = {};
    if (include && !!include.length) {
      includes = include.reduce((accum: any, currentValue: string) => {
        accum[currentValue] = true;
        return accum;
      }, {});
    }

    return this.prisma.company.findUnique({
      where: {
        uuid,
      },
      include: Object.keys(includes).length ? includes : undefined,
    });
  }

  update(uuid: string, updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
    return this.prisma.company.update({
      where: {
        uuid,
      },
      data: updateCompanyDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.company.delete({
      where: {
        uuid,
      },
    });
  }
}
