import { Writable } from 'stream';

import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import morgan from 'morgan';
import redis from 'redis';

import { LagMiddleware } from 'Common/lag.middleware';
import { RolesGuard } from 'Common/roles.guard';
import { UserMiddleware } from 'Common/user.middleware';

import { AppController } from './app.controller';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommentsAreaModule } from './modules/comments-area/comments-area.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { EmailModule } from './modules/email/email.module';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';
import { ModerationModule } from './modules/moderation/moderation.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

const AppGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

const fakeLagProvider: Provider = {
  provide: 'FAKE_LAG',
  useValue: 230,
};

@Module({
  providers: [AppGuardProvider, fakeLagProvider],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    LoggerModule,
    ConfigModule,
    HealthcheckModule,
    EmailModule,
    UserModule,
    AuthenticationModule,
    AuthorizationModule,
    CommentsAreaModule,
    CommentModule,
    ModerationModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly configService: ConfigService, private readonly logger: LoggerService) {
    this.logger.setContext('AppModule');
  }

  configure(consumer: MiddlewareConsumer) {
    const NODE_ENV = this.configService.get('NODE_ENV');
    const CI = this.configService.get('CI');

    const middlewares = [];

    middlewares.push(this.configureSession());

    if (CI !== 'true') {
      middlewares.push(this.configureMorgan());
    }

    middlewares.push(UserMiddleware);

    consumer.apply(...middlewares).forRoutes('*');

    if (NODE_ENV === 'development') {
      consumer.apply(LagMiddleware).forRoutes('*');
    }
  }

  private configureSession() {
    const SESSION_SECRET = this.configService.get('SESSION_SECRET');
    const SECURE_COOKIE = this.configService.get('SECURE_COOKIE');
    const REDIS_HOST = this.configService.get('REDIS_HOST');
    const REDIS_PORT = this.configService.get('REDIS_PORT');

    const getStore = () => {
      const RedisStore = connectRedis(expressSession);
      const redisClient = redis.createClient({
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      });

      return new RedisStore({ client: redisClient });
    };

    this.logger.verbose(`configure express-session with SECURE_COOKIE = ${SECURE_COOKIE}`);

    return expressSession({
      cookie: {
        // one year
        maxAge: Date.now() + 30 * 86400 * 1000,
        ...(SECURE_COOKIE === 'true' && {
          sameSite: 'none',
          secure: true,
        }),
      },
      store: getStore(),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    });
  }

  private configureMorgan() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const log = (chunks: any[]) => {
      this.logger.log(
        chunks
          .map(({ chunk }) => chunk)
          .map(String)
          .join('')
          .replace(/\n$/, ''),
        'Request',
      );
    };

    const stream = new Writable({
      writev(chunks, cb) {
        log(chunks);
        cb();
      },
      write(chunk, encoding, cb) {
        log([{ chunk }]);
        cb();
      },
    });

    this.logger.verbose('configure morgan middleware');

    return morgan(':method :url :status - :remote-addr - :response-time ms', { stream });
  }
}
