import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class UserCheckDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}
