import { Person, PersonSexEnum } from '@prisma/client';

import { Exclude, Type } from 'class-transformer';

export class PersonEntity implements Person {
  uuid: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  sex: PersonSexEnum;

  @Type(() => Date)
  birthday: Date;

  @Exclude()
  userUuid: string;
}
