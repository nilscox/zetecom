import * as express from 'express';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { ExpressAdapter } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';

import { ErrorsInterceptor } from 'Common/errors.interceptor';

export const setupE2eTest = (testingModule: ModuleMetadata, beforeInit?: (module: TestingModuleBuilder) => any) => {

  const server = express();
  let module: TestingModule;

  beforeAll(async () => {
    if (!testingModule.imports)
      testingModule.imports = [];

    testingModule.imports.unshift(
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'test',
        synchronize: true,
        dropSchema: true,
        entities: ['src/**/*.entity.ts'],
        // logging: ['query', 'error'],
      }),
    );

    const moduleBuilder = await Test.createTestingModule(testingModule);

    if (beforeInit)
      beforeInit(moduleBuilder);

    module = await moduleBuilder.compile();

    const app = module.createNestApplication(new ExpressAdapter(server));

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ErrorsInterceptor());

    await app.init();
  });

  afterAll(async () => {
    await module.close();
  });

  return server;
};
