import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshTokenRepository } from './refresh-token.repository';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refrersh.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { algorithm: 'HS256', expiresIn: '1m' },
      }),
    }),
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
