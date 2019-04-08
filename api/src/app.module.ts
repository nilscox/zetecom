import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import * as expressSession from 'express-session';
import * as memorystore from 'memorystore';

import { UserMiddleware } from 'Common/user.middleware';
import { LagMiddleware } from 'Common/lag.middleware';

import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { InformationModule } from './modules/information/information.module';
import { ReactionModule } from './modules/reaction/reaction.module';

import { AppController } from './app.controller';

const FAKE_LAG = 230;

const MemoryStore = memorystore(expressSession);

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthenticationModule,
    InformationModule,
    ReactionModule,
  ],
  controllers: [AppController],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
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

    MorganMiddleware.configure(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');

    consumer
      .apply(ExpressSessionMiddleware, MorganMiddleware, UserMiddleware)
      .forRoutes('*');

    if (process.env.NODE_ENV === 'development') {
      CorsMiddleware.configure({
        origin: true,
        credentials: true,
      });

      consumer
        .apply(CorsMiddleware)
        .forRoutes('*');

      consumer
        .apply(LagMiddleware)
        .with(FAKE_LAG)
        .forRoutes('*');
    }
  }

}
