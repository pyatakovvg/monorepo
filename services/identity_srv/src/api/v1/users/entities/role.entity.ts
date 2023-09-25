import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  code: string;
  displayName: string;
}
