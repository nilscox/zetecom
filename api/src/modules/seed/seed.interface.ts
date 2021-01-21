import { QueryRunner } from 'typeorm';

import { LoggerService } from 'src/modules/logger/logger.service';

export interface Seed {
  readonly name: string;
  run(queryRunner: QueryRunner, logger: LoggerService): Promise<void>;
}
