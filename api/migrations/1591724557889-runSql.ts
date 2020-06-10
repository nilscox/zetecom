import { MigrationInterface, QueryRunner } from 'typeorm';

import * as idx from './sql/idx';

export class RunSql1591724557889 implements MigrationInterface {

  name = 'runSql1591724557889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(idx.up);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(idx.down);
  }

}
