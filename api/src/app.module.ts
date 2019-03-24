import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { MorganMiddleware } from '@nest-middlewares/morgan';

import { UserMiddleware } from 'Common/user.middleware';
import { LagMiddleware } from 'Common/lag.middleware';

import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { InformationModule } from './modules/information/information.module';
import { ReactionModule } from './modules/reaction/reaction.module';

import { AppController } from './app.controller';

const FAKE_LAG = 230;

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
    CorsMiddleware.configure({
      origin: true,
      credentials: true,
    });

    ExpressSessionMiddleware.configure({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    });

    MorganMiddleware.configure('dev');

    consumer
      .apply(CorsMiddleware, ExpressSessionMiddleware, MorganMiddleware, UserMiddleware)
      .forRoutes('*');

    consumer
      .apply(LagMiddleware)
      .with(FAKE_LAG)
      .forRoutes('*');
  }

}
