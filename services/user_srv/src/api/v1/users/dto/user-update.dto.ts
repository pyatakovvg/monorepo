import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
