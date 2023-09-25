import { User } from '@prisma/client';

import { Exclude, Type } from 'class-transformer';

import { RoleEntity } from './role.entity';
import { ClaimEntity } from './claim.entity';
import { PersonEntity } from './person.entity';

export class UserEntity implements User {
  uuid: string;
  email: string;

  @Type(() => RoleEntity)
  roles: RoleEntity[];

  @Type(() => ClaimEntity)
  claims: ClaimEntity[];

  @Type(() => PersonEntity)
  person: PersonEntity;

  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;
}
