// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="index.d.ts" />

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

const { LISTEN_PORT, LISTEN_IP, REFLECT_ORIGIN } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  if (REFLECT_ORIGIN === 'true')
    app.enableCors({ origin: true, credentials: true });

  await app.listen(parseInt(LISTEN_PORT || '3000', 10), LISTEN_IP || '0.0.0.0');
}

bootstrap();
