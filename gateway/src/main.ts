import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'gateway',
      port: 4020
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(3020);
  Logger.log('Auth microservice running');
}
bootstrap();