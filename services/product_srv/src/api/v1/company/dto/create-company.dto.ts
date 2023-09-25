import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  countryCode: string;
  districtUuid: string;
  regionUuid: string;
  cityUuid: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsNotEmpty()
  postalCode: number;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  supportPhone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  supportEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  managerPhone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  managerEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  orderPhone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  orderEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  replayToEmail: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsNotEmpty()
  startYear: number;
}
