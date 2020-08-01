import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { Module, UseGuards, ValidationPipe } from '@nestjs/common';
import { MiddlewareConsumer, ModuleMetadata } from '@nestjs/common/interfaces';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
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

import { ErrorsInterceptor } from 'Common/errors.interceptor';
import { RolesGuard } from 'Common/roles.guard';
import { UserMiddleware } from 'Common/user.middleware';

import { AuthorizationModule } from '../modules/authorization/authorization.module';
import { Role } from '../modules/authorization/roles.enum';
import { ConfigModule } from '../modules/config/config.module';
import { User } from '../modules/user/user.entity';

import { GraphQLClient } from './GraphQLClient';

const MemoryStore = memorystore(expressSession);

@Resolver(() => Int)
class RootQueryResolver {
  @Query(() => Int)
  root() {
    return 42;
  }
}

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot({ autoSchemaFile: true, useGlobalPrefix: true }),
    AuthorizationModule,
    ConfigModule,
    RootQueryResolver,
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class TestModule {

  configure(consumer: MiddlewareConsumer) {
    const middlewares: any[] = [];

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

type SetupE2eTestOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeInit?: (module: TestingModuleBuilder) => any | Promise<any>;
};

export const setupE2eTest = (testingModule: ModuleMetadata, opts?: SetupE2eTestOptions) => {

  const server = express();
  const graph = new GraphQLClient();
  let module: TestingModule;

  beforeAll(async () => {
    const moduleBuilder = Test.createTestingModule({
      ...testingModule,
      imports: [TestModule, ...testingModule.imports || []],
    });

    await opts?.beforeInit?.(moduleBuilder);

    module = await moduleBuilder.compile();

    const app = module.createNestApplication(new ExpressAdapter(server));

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ErrorsInterceptor());

    await app.init();

    graph.server = server;
  });

  afterAll(async () => {
    await module.close();
  });

  return { server, graph, getModule: () => module };
};

let createUsersCount = 0;

export const createAuthenticatedUser = (server) => {
  const userRequest = request.agent(server);
  const user: User = {} as any;

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
  });

  return [userRequest, user] as const;
};

export const createAuthenticatedAdmin = (server) => {
  const [adminRequest, admin] = createAuthenticatedUser(server);

  beforeAll(async () => {
    await getRepository(User).update({ id: admin.id }, { roles: [Role.USER, Role.ADMIN] });
  });

  return [adminRequest, admin] as const;
};
