import path from 'path';

import dotenv from 'dotenv';
import { addAlias } from 'module-alias';

addAlias('Common', path.resolve(__dirname, '..', '..', 'common'));
addAlias('Utils', path.resolve(__dirname, '..', '..', 'utils'));

dotenv.config();

import { NestFactory } from '@nestjs/core';

import { CypressModule } from './cypress.module';

const {
  LISTEN_PORT = '4242',
  LISTEN_IP = '0.0.0.0',
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(CypressModule);

  await app.listen(parseInt(LISTEN_PORT, 10), LISTEN_IP);
}

bootstrap();
