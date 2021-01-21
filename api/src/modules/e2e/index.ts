import dotenv from 'dotenv';

import 'module-alias/register';

dotenv.config();

import { NestFactory } from '@nestjs/core';

import { LoggerService } from 'src/modules/logger/logger.service';

import { E2eModule } from './e2e.module';

const { LISTEN_PORT = '4242', LISTEN_IP = '0.0.0.0' } = process.env;

async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(E2eModule, { logger });

  await app.listen(parseInt(LISTEN_PORT, 10), LISTEN_IP);
}

bootstrap();
