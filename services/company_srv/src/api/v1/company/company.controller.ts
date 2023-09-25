import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { CompanyService } from './company.service';

import { CompanyEntity } from './entities/company.entity';

import { QueryDto } from './dto/query.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
@ApiTags('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiCreatedResponse({ type: CompanyEntity })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  findAll(@Query() queryDto?: QueryDto) {
    return this.companyService.findAll(queryDto.include);
  }

  @Get(':uuid')
  @ApiOkResponse({ type: CompanyEntity })
  findOne(@Param('uuid') uuid: string, @Query() queryDto?: QueryDto) {
    return this.companyService.findOne(uuid, queryDto.include);
  }

  @Patch(':uuid')
  @ApiCreatedResponse({ type: CompanyEntity })
  update(
    @Param('uuid') uuid: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(uuid, updateCompanyDto);
  }

  @Delete(':uuid')
  @ApiOkResponse({ type: CompanyEntity })
  remove(@Param('uuid') uuid: string) {
    return this.companyService.remove(uuid);
  }
}
