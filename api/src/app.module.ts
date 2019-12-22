import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import * as expressSession from 'express-session';
import * as memorystore from 'memorystore';

import { UserMiddleware } from 'Common/user.middleware';
import { LagMiddleware } from 'Common/lag.middleware';

import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { User } from './modules/user/user.entity';
import { EmailModule } from './modules/email/email.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { InformationModule } from './modules/information/information.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';

import { AppController } from './app.controller';

const fakeLagProvider = {
  provide: 'FAKE_LAG',
  useValue: 230,
};

const MemoryStore = memorystore(expressSession);

@Module({
  providers: [fakeLagProvider],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    HealthcheckModule,
    EmailModule,
    UserModule,
    AuthenticationModule,
    InformationModule,
    ReactionModule,
    BookmarkModule,
  ],
  controllers: [AppController],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [];

    ExpressSessionMiddleware.configure({
      // one year
      cookie: { maxAge: Date.now() + (30 * 86400 * 1000) },
      store: new MemoryStore({
        // one day
        checkPeriod: 86400000,
      }),
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    });

    middlewares.push(ExpressSessionMiddleware);

    if (process.env.CI !== 'true') {
      MorganMiddleware.configure(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');
      middlewares.push(MorganMiddleware);
    }

    middlewares.push(UserMiddleware);

    consumer
      .apply(...middlewares)
      .forRoutes('*');

    if (process.env.NODE_ENV === 'development') {
      consumer
        .apply(LagMiddleware)
        .forRoutes('*');
    }
  }

}
