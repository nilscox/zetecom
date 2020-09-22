import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import expressSession from 'express-session';
import memorystore from 'memorystore';

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
  providers: [
    AppGuardProvider,
    fakeLagProvider,
  ],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
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

  constructor(
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const NODE_ENV = this.configService.get('NODE_ENV');
    const CI = this.configService.get('CI');
    const SESSION_SECRET = this.configService.get('SESSION_SECRET');
    const SSL_CERTIFICATE = this.configService.get('SSL_CERTIFICATE');
    const SSL_CERTIFICATE_KEY = this.configService.get('SSL_CERTIFICATE_KEY');

    const middlewares = [];

    ExpressSessionMiddleware.configure({
      // one year
      cookie: {
        maxAge: Date.now() + (30 * 86400 * 1000),
        ...(NODE_ENV === 'development' && SSL_CERTIFICATE && SSL_CERTIFICATE_KEY && {
          sameSite: 'none',
          secure: true,
        }),
      },
      store: new MemoryStore({
        // one day
        checkPeriod: 86400000,
      }),
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    });

    middlewares.push(ExpressSessionMiddleware);

    if (CI !== 'true') {
      MorganMiddleware.configure(NODE_ENV === 'production' ? 'combined' : 'dev');
      middlewares.push(MorganMiddleware);
    }

    middlewares.push(UserMiddleware);

    consumer
      .apply(...middlewares)
      .forRoutes('*');

    if (NODE_ENV === 'development') {
      consumer
        .apply(LagMiddleware)
        .forRoutes('*');
    }
  }

}
