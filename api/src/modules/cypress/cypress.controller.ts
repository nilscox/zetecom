import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CypressService } from './cypress.service';
import { Dataset } from './dtos/Dataset';

@Controller('seed')
export class CypressController {
  constructor(
    private readonly cypressService: CypressService,
  ) {}

  @Post()
  @HttpCode(204)
  @UsePipes(new ValidationPipe)
  async seed(@Body() data: Dataset) {
    await this.cypressService.dropDatabase();
    await this.cypressService.seed(data);
  }
}
