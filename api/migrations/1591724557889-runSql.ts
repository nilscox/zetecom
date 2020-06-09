import * as fs from 'fs';
import * as path from 'path';

import { MigrationInterface, QueryRunner } from 'typeorm';

export class RunSql1591724557889 implements MigrationInterface {

  name = 'runSql1591724557889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const dir = path.join(__dirname, 'sql', 'up');

    for (const file of fs.readdirSync(dir)) {
      await queryRunner.query(fs.readFileSync(path.join(dir, file)).toString());
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dir = path.join(__dirname, 'sql', 'down');

    for (const file of fs.readdirSync(dir)) {
      await queryRunner.query(fs.readFileSync(path.join(dir, file)).toString());
    }
  }

}
