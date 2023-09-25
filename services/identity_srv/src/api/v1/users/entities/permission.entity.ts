import { Permission } from '@prisma/client';

export class PermissionEntity implements Permission {
  code: string;
  displayName: string;
}
