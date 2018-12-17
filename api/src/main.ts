import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from 'Common/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  if (process.env.NODE_ENV === 'development')
    app.enableCors({ origin: true, credentials: true });

  await app.listen(3000);
}

bootstrap();
