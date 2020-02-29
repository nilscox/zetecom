/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addInformationImageUrl1581970094091 implements MigrationInterface {
    name = 'addInformationImageUrl1581970094091';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" ADD "image_url" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" DROP COLUMN "image_url"`, undefined);
    }

}
