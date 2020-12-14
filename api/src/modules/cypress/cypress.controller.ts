import { Body, Controller, HttpCode, Post, SetMetadata, UseGuards } from '@nestjs/common';

import { CypressService } from './cypress.service';
import { DatabaseGuard } from './database.guard';
import { Dataset } from './dtos/Dataset';

@Controller('seed')
export class CypressController {
  constructor(private readonly cypressService: CypressService) {}

  @Post()
  @UseGuards(DatabaseGuard)
  @SetMetadata('database', 'cypress')
  @HttpCode(204)
  async seed(@Body() data: Dataset) {
    await this.cypressService.dropDatabase();
    await this.cypressService.seed(data);
  }
}
