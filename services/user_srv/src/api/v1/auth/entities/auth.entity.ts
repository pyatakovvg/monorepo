import { Auth } from '@prisma/client';

export class AuthEntity implements Auth {
  uuid: string;
  email: string;
  password: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
