import { IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

import { AuthCreateDto } from './auth-create.dto';

export class AuthUpdateDto extends AuthCreateDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isBlocked?: boolean;
}
