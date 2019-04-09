import * as path from 'path';
import { addAlias } from 'module-alias';
import * as dotenv from 'dotenv';

addAlias('Common', path.join(__dirname, 'common'));
addAlias('Utils', path.join(__dirname, 'utils'));

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { ErrorsInterceptor } from 'Common/errors.interceptor';

const { LISTEN_PORT, LISTEN_IP } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  if (process.env.NODE_ENV === 'development')
    app.enableCors({ origin: true, credentials: true });

  await app.listen(LISTEN_PORT, LISTEN_IP);
}

bootstrap();
