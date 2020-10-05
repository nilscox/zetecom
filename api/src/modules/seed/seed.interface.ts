import { QueryRunner } from 'typeorm';

import { LoggerService } from '../logger/logger.service';

export interface Seed {
  readonly name: string;
  run(queryRunner: QueryRunner, logger: LoggerService): Promise<void>;
}
