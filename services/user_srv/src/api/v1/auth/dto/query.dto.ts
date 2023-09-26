import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail, IsInt } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  take?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  skip?: number;
}
