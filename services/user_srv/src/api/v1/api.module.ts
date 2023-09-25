import { Module } from '@nestjs/common';

import { AuthModule } from '@/api/v1/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class ApiV1Module {}
