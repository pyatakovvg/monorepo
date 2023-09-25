import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsArray,
  IsOptional,
} from 'class-validator';

import { PersonCreateDto } from './person-create.dto';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsArray()
  roles: string[];

  @IsArray({ each: true })
  claims: any[];

  @IsOptional()
  person?: PersonCreateDto;
}
