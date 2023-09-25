import { Claim } from '@prisma/client';

import { Exclude } from 'class-transformer';

export class ClaimEntity implements Claim {
  uuid: string;
  key: string;
  value: string;

  @Exclude()
  userUuid: string;
}
