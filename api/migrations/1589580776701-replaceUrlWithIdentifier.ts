/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class replaceUrlWithIdentifier1589580776701 implements MigrationInterface {
    name = 'replaceUrlWithIdentifier1589580776701'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "information" RENAME COLUMN "url" TO "identifier"`, undefined);
      await queryRunner.query(`ALTER TABLE "information" RENAME CONSTRAINT "UQ_c3bef4a1042ba8f97de84ee1b24" TO "UQ_ced12a4957cd63b5ce0f0bc0138"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "information" RENAME CONSTRAINT "UQ_ced12a4957cd63b5ce0f0bc0138" TO "UQ_c3bef4a1042ba8f97de84ee1b24"`, undefined);
      await queryRunner.query(`ALTER TABLE "information" RENAME COLUMN "identifier" TO "url"`, undefined);
    }

}
