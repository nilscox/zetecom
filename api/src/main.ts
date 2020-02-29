import * as path from 'path';

import * as dotenv from 'dotenv';
import { addAlias } from 'module-alias';

addAlias('Common', path.join(__dirname, 'common'));
addAlias('Utils', path.join(__dirname, 'utils'));

dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ErrorsInterceptor } from 'Common/errors.interceptor';

import { AppModule } from './app.module';

const { LISTEN_PORT, LISTEN_IP } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  if (process.env.REFLECT_ORIGIN === 'true')
    app.enableCors({ origin: true, credentials: true });

  await app.listen(LISTEN_PORT, LISTEN_IP);
}

bootstrap();
