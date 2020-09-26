import { QueryRunner } from 'typeorm';

export interface Seed {
  readonly name: string;
  run(queryRunner: QueryRunner): Promise<void>;
}
