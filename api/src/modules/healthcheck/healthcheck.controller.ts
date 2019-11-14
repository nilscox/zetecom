import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import fetch from 'node-fetch';
import { Output } from 'Common/output.interceptor';
import { HealthCheckOutDto } from './dtos/healthcheck-out.dto';

const { EXTENSION_URL, WEBSITE_URL } = process.env;

@Controller('healthcheck')
@UseInterceptors(ClassSerializerInterceptor)
export class HealthcheckController {

  private static async checkDatabase() {
    try {
      await getConnection().query('SELECT * FROM "migrations"');
      return true;
    } catch (_e) {
      return false;
    }
  }

  private static async checkExtension() {
    try {
      await fetch(EXTENSION_URL);
      return true;
    } catch (_e) {
      return false;
    }
  }

  private static async checkWebsite() {
    try {
      await fetch(WEBSITE_URL);
      return true;
    } catch (_e) {
      return false;
    }
  }

  @Get()
  @Output(HealthCheckOutDto)
  async check(): Promise<HealthCheckOutDto> {
    return {
      api: true,
      database: await HealthcheckController.checkDatabase(),
      extension: await HealthcheckController.checkExtension(),
      website: await HealthcheckController.checkWebsite(),
    };
  }

}
