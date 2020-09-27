// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="index.d.ts" />

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { addAlias } from 'module-alias';

addAlias('Common', path.join(__dirname, 'common'));
addAlias('Utils', path.join(__dirname, 'utils'));

dotenv.config();

import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ErrorsInterceptor } from 'Common/errors.interceptor';

import { AppModule } from './app.module';

const {
  LISTEN_PORT,
  LISTEN_IP,
  REFLECT_ORIGIN,
  NODE_ENV,
  SSL_CERTIFICATE,
  SSL_CERTIFICATE_KEY,
  TRUST_PROXY,
} = process.env;

async function bootstrap() {
  const opts: NestApplicationOptions = {};

  if (SSL_CERTIFICATE && SSL_CERTIFICATE_KEY) {
    opts.httpsOptions = {
      cert: (await fs.promises.readFile(SSL_CERTIFICATE)).toString(),
      key: (await fs.promises.readFile(SSL_CERTIFICATE_KEY)).toString(),
    };
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, opts);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  if (NODE_ENV === 'development' && TRUST_PROXY === 'true')
    app.set('trust proxy', 1);

  if (REFLECT_ORIGIN === 'true')
    app.enableCors({ origin: true, credentials: true });

  await app.listen(parseInt(LISTEN_PORT || '3000', 10), LISTEN_IP || '0.0.0.0');
}

bootstrap();
