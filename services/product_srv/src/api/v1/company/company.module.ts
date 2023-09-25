import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { PrismaModule } from '@/prisma/prisma.module';

import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  controllers: [CompanyController],
  imports: [PrismaModule],
  providers: [
    CompanyService,
    {
      provide: 'ORDER_SERVICE',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const amqHost = config.get('AMQP_HOSTNAME');
        const amqUser = config.get('AMQP_USERNAME');
        const amqPassword = config.get('AMQP_PASSWORD');
        const amqQueue = config.get('ORDER_SRV_AMQP_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${amqUser}:${amqPassword}@${amqHost}:5672`],
            queue: amqQueue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
})
export class CompanyModule {}
