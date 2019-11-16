import { Module } from '@nestjs/common';

import { HealthcheckController } from './healthcheck.controller';
import { HealthCheckService } from './HealthCheck.service';

@Module({
  controllers: [
    HealthcheckController,
  ],
  providers: [
    HealthCheckService,
  ],
})
export class HealthcheckModule {}
