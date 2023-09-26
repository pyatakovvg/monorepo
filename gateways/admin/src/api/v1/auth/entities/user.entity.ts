import { Type, Exclude } from 'class-transformer';

import { RoleEntity } from './role.entity';

export class UserEntity {
  uuid: string;
  email: string;
  isBlocked: boolean;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  @Type(() => RoleEntity)
  roles: RoleEntity[];

  @Exclude()
  claims: any;

  @Exclude()
  person: any;
}
