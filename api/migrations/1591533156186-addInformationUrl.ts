/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class addInformationUrl1591533156186 implements MigrationInterface {
  name = 'addInformationUrl1591533156186'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "information" ADD "url" character varying NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "information" DROP COLUMN "url"`, undefined);
  }

}
