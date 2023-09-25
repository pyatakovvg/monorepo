import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

type TInclude = Array<'shops' | 'company'>;

export class QueryDto {
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsOptional()
  @IsArray({
    message: 'include - ожидается массив',
  })
  @ApiProperty({ required: false, isArray: true })
  include?: TInclude;
}
