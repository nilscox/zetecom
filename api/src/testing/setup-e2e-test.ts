import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { MiddlewareConsumer, ModuleMetadata } from '@nestjs/common/interfaces';
import { APP_GUARD } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import express from 'express';
import expressSession from 'express-session';
import memorystore from 'memorystore';
import request from 'supertest';
import { getRepository } from 'typeorm';

dotenv.config({ path: '.env.test' });

import { ErrorsInterceptor } from 'src/common/errors.interceptor';
import { RolesGuard } from 'src/common/roles.guard';
import { UserMiddleware } from 'src/common/user.middleware';
import { AuthorizationModule } from 'src/modules/authorization/authorization.module';
import { Role } from 'src/modules/authorization/roles.enum';
import { ConfigModule } from 'src/modules/config/config.module';
import { User } from 'src/modules/user/user.entity';

import { debug } from './supertest-debug-plugin';

const MemoryStore = memorystore(expressSession);

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User]), AuthorizationModule, ConfigModule],
  exports: [TypeOrmModule],
})
export class TestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [];

    middlewares.push(
      expressSession({
        store: new MemoryStore(),
        secret: 'SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
      }),
    );

    middlewares.push(UserMiddleware);

    consumer.apply(...middlewares).forRoutes('*');
  }
}

export const setupE2eTest = (testingModule: ModuleMetadata, beforeInit?: (module: TestingModuleBuilder) => void) => {
  const server = express();
  let module: TestingModule;

  beforeAll(async () => {
    const moduleBuilder = Test.createTestingModule({
      ...testingModule,
      imports: [TestModule, ...testingModule.imports],
    });

    if (beforeInit) {
      beforeInit(moduleBuilder);
    }

    module = await moduleBuilder.compile();

    const app = module.createNestApplication(new ExpressAdapter(server));

    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await module.close();
  });

  return { server, getTestingModule: () => module };
};

let createUsersCount = 0;

export const createAuthenticatedUser = (server, roles?: Role[]) => {
  const userRequest = request.agent(server);
  const user = {} as User;

  userRequest.use(debug);

  beforeAll(async () => {
    const { body } = await userRequest
      .post('/api/auth/signup')
      .send({
        nick: `nick${createUsersCount}`,
        email: `user${createUsersCount}@domain.tld`,
        password: 'password',
      })
      .expect(201);

    Object.assign(user, body);
    createUsersCount++;

    if (Array.isArray(roles)) {
      await getRepository(User).update({ id: user.id }, { roles });
    }
  });

  return [userRequest, user] as const;
};

export const createAuthenticatedModerator = (server) => {
  return createAuthenticatedUser(server, [Role.USER, Role.MODERATOR]);
};

export const createAuthenticatedAdmin = (server) => {
  return createAuthenticatedUser(server, [Role.USER, Role.MODERATOR, Role.ADMIN]);
};
