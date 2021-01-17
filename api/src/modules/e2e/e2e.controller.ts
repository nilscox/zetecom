import { Body, Controller, HttpCode, Post, SetMetadata, UseGuards } from '@nestjs/common';

import { DatabaseGuard } from './database.guard';
import { Dataset } from './dtos/Dataset';
import { E2eService } from './e2e.service';

@Controller('e2e')
export class E2eController {
  constructor(private readonly e2eService: E2eService) {}

  @Post('seed')
  @UseGuards(DatabaseGuard)
  @SetMetadata('database', 'e2e')
  @HttpCode(204)
  async seed(@Body() data: Dataset) {
    await this.e2eService.dropDatabase();
    await this.e2eService.flushRedis();
    await this.e2eService.seed(data);
  }
}
