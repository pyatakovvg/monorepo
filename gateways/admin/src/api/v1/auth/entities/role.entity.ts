import { Transform, Exclude } from 'class-transformer';

import { PermissionEntity } from './permission.entity';

export class RoleEntity {
  code: string;

  @Exclude()
  displayName: string;

  @Transform(({ value }) => value.map((permission: PermissionEntity) => permission.code))
  permissions: string[];
}
