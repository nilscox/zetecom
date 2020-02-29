/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class uniqueInformationUrl1575294741557 implements MigrationInterface {
    name = 'uniqueInformationUrl1575294741557';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" ADD CONSTRAINT "UQ_c3bef4a1042ba8f97de84ee1b24" UNIQUE ("url")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" DROP CONSTRAINT "UQ_c3bef4a1042ba8f97de84ee1b24"`, undefined);
    }

}
