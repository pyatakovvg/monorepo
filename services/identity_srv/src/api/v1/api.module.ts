import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RefreshTokenModule } from './refreshToken/refresh-token.module';

@Module({
  imports: [UsersModule, RolesModule, RefreshTokenModule],
})
export class ApiV1Module {}
