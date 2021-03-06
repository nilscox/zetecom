import {
  ArgumentsHost,
  Catch,
  ClassSerializerInterceptor,
  Controller,
  ExceptionFilter,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { HealthCheckService } from './HealthCheck.service';

@Catch(HttpException)
export class HealthCheckExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status !== HttpStatus.EXPECTATION_FAILED)
      throw exception;

    response
      .status(HttpStatus.EXPECTATION_FAILED)
      .send(exception.message);
  }
}

@Controller('healthcheck')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HealthCheckExceptionFilter)
export class HealthcheckController {

  constructor(
    private healthCheckService: HealthCheckService,
  ) {}

  @Get()
  async check(): Promise<{ api: boolean; database: boolean }> {
    const result = {
      api: true,
      database: await this.healthCheckService.checkDatabase(),
    };

    if (Object.values(result).includes(false))
      throw new HttpException(result, HttpStatus.EXPECTATION_FAILED);

    return result;
  }

  @Get('/api')
  async checkApi() {
    return 'ok';
  }

  @Get('/database')
  async checkDatabase() {
    if (await this.healthCheckService.checkDatabase())
      return 'ok';

    throw new HttpException('ko', HttpStatus.EXPECTATION_FAILED);
  }

}
