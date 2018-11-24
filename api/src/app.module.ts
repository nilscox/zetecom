import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';

import { UserMiddleware } from 'Common/user.middleware';

import { InformationModule } from './information/information.module';
import { UserModule } from './user/user.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    InformationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    ExpressSessionMiddleware.configure({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    });

    consumer
      .apply(ExpressSessionMiddleware, UserMiddleware)
      .forRoutes('*');
  }

}
