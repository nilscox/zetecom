/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class addInformationPublicationDate1591533729696 implements MigrationInterface {
  name = 'addInformationPublicationDate1591533729696'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "information" ADD "published" date`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "information" DROP COLUMN "published"`, undefined);
  }

}
