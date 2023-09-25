import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
// import { QueueAdapterType, RabbitMQModule } from '@mkfyi/nestjs-rmq';

import { ApiV1Module } from '@/api/v1/api.module';

import { JwtAuthGuard } from '@/api/v1/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      cache: true,
      isGlobal: true,
    }),

    // RabbitMQModule.forRootAsync({
    //   connection: {
    //     imports: [ConfigModule],
    //     useFactory: (config: ConfigService) => ({
    //       hostname: config.get('AMQP_HOSTNAME'),
    //       username: config.get('AMQP_USERNAME'),
    //       password: config.get('AMQP_PASSWORD'),
    //     }),
    //     inject: [ConfigService],
    //   },
    // adapters: [
    //   {
    //     name: 'user.adapter.mq',
    //     queue: 'admin_gw.user.update',
    //     type: QueueAdapterType.Worker
    //   }
    // ]
    // }),

    ApiV1Module,
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
class AppModule {}

export { AppModule };
