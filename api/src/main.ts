// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="index.d.ts" />

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { addAlias } from 'module-alias';

addAlias('Common', path.join(__dirname, 'common'));
addAlias('Utils', path.join(__dirname, 'utils'));

dotenv.config();

import { BadRequestException, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ErrorsInterceptor } from 'Common/errors.interceptor';

import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';

const {
  LISTEN_PORT = '3000',
  LISTEN_IP = '0.0.0.0',
  REFLECT_ORIGIN,
  TRUST_PROXY,
} = process.env;

const LOG_TAG = 'Bootstrap';

async function bootstrap() {
  const logger = new LoggerService();
  const appOpts: NestApplicationOptions = { logger };

  logger.verbose('creating nest application', LOG_TAG);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOpts);

  app.useLogger(logger);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: errors => new BadRequestException(errors),
  }));

  if (TRUST_PROXY === 'true') {
    logger.verbose('setting trust proxy', 'Bootstrap');
    app.set('trust proxy', true);
  }

  if (REFLECT_ORIGIN === 'true') {
    logger.verbose('enabling cors', 'Bootstrap');
    app.enableCors({ origin: true, credentials: true });
  }

  const ip = LISTEN_IP;
  const port = parseInt(LISTEN_PORT, 10);

  logger.verbose(`starting server on ${ip}:${port}`, 'Bootstrap');
  await app.listen(port, ip);

  logger.verbose('application started', 'Bootstrap');
}

bootstrap();
