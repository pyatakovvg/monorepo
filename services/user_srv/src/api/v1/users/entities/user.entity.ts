import { User } from '@prisma/client';

export class UserEntity implements User {
  uuid: string;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: any[];
  authUuid: string;
  createdAt: Date;
  updatedAt: Date;
}
