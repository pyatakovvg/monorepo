import { Module } from '@nestjs/common';

import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [CompanyModule, CategoryModule, ShopModule],
})
export class ApiV1Module {}
