import { PersonSexEnum } from '@prisma/client';

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PersonCreateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string | null;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  sex: PersonSexEnum;
}
