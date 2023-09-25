import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule, QueueAdapterType } from '@mkfyi/nestjs-rmq';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ApiV1Module } from '@/api/v1/api.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    RabbitMQModule.forRootAsync({
      connection: {
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          autoConnect: true,
          hostname: config.get('AMQP_HOSTNAME'),
          username: config.get('AMQP_USERNAME'),
          password: config.get('AMQP_PASSWORD'),
        }),
        inject: [ConfigService],
      },
      // adapters: [
      //   {
      //     name: 'user.adapter.mq',
      //     queue: 'admin_gw.user.update',
      //     type: QueueAdapterType.Worker
      //   }
      // ]
    }),

    PrismaModule,

    ApiV1Module,
  ],
  controllers: [],
  providers: [],
})
class AppModule {}

export { AppModule };
