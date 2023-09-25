import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configSwaggerBuilder = new DocumentBuilder()
    .setTitle('Сервис product_srv')
    // .setDescription('The Median API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, configSwaggerBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('PORT'));
  });
}

bootstrap();
