import { Shop } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyEntity } from '@/api/v1/company/entities/company.entity';

export class ShopEntity implements Shop {
  @ApiProperty({ required: true })
  uuid: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  companyUuid: string;

  @ApiProperty()
  company?: CompanyEntity;

  @ApiProperty()
  products?: any[];

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
