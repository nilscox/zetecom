import { Writable } from 'stream';

import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import expressSession from 'express-session';
import memorystore from 'memorystore';
import morgan from 'morgan';

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

const MemoryStore = memorystore(expressSession);

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
    const { logger } = this;

    const NODE_ENV = this.configService.get('NODE_ENV');
    const SESSION_SECRET = this.configService.get('SESSION_SECRET');
    const SECURE_COOKIE = this.configService.get('SECURE_COOKIE');
    const CI = this.configService.get('CI');

    const middlewares = [];

    logger.verbose(`configure express-session with SECURE_COOKIE = ${SECURE_COOKIE}`);

    middlewares.push(expressSession({
      cookie: {
        // one year
        maxAge: Date.now() + 30 * 86400 * 1000,
        ...(SECURE_COOKIE === 'true' && {
          sameSite: 'none',
          secure: true,
        }),
      },
      // TODO: use a real store in production
      store: new MemoryStore({
        // one day
        checkPeriod: 86400000,
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }));

    if (CI !== 'true') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const log = (chunks: any[]) => {
        logger.log(
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

      logger.verbose('configure morgan middleware');

      middlewares.push(morgan(':method :url :status - :remote-addr - :response-time ms', { stream }));
    }

    middlewares.push(UserMiddleware);

    consumer.apply(...middlewares).forRoutes('*');

    if (NODE_ENV === 'development') {
      consumer.apply(LagMiddleware).forRoutes('*');
    }
  }
}
