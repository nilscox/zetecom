import * as express from 'express';
import * as request from 'supertest';
import { ModuleMetadata, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { ExpressAdapter } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { ValidationPipe, Module } from '@nestjs/common';
import * as expressSession from 'express-session';
import * as memorystore from 'memorystore';

import { ErrorsInterceptor } from 'Common/errors.interceptor';
import { UserMiddleware } from 'Common/user.middleware';
import { UserOutDto } from 'src/modules/user/dtos/user-out.dto';
import { User } from '../modules/user/user.entity';

const MemoryStore = memorystore(expressSession);

@Module({
  imports: [
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
      logging: ['query', 'error'],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class TestModule {

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [];

    ExpressSessionMiddleware.configure({
      store: new MemoryStore(),
      secret: 'SESSION_SECRET',
      resave: true,
      saveUninitialized: true,
    });

    middlewares.push(ExpressSessionMiddleware);
    middlewares.push(UserMiddleware);

    consumer
      .apply(...middlewares)
      .forRoutes('*');
  }

}

export const setupE2eTest = (testingModule: ModuleMetadata, beforeInit?: (module: TestingModuleBuilder) => any): express.Express => {

  const server = express();
  let module: TestingModule;

  beforeAll(async () => {
    const moduleBuilder = await Test.createTestingModule({
      ...testingModule,
      imports: [TestModule, ...testingModule.imports],
    });

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

let createUsersCount = 0;

export const createAuthenticatedUser = (server) => {
  const authRequest = request.agent(server);
  const user: UserOutDto = {} as any;

  beforeAll(async () => {
    const { body } = await authRequest
      .post('/api/auth/signup')
      .send({
        nick: `nick${createUsersCount}`,
        email: `user${createUsersCount}@domain.tld`,
        password: 'password',
      })
      .expect(201);

    Object.assign(user, body);
    createUsersCount++;
  });

  return { authRequest, user };
};
