/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReactionInformation1574794782005 implements MigrationInterface {
    name = 'addReactionInformation1574794782005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" ADD "information_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_0778deb32d7a27856276b45b766" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_0778deb32d7a27856276b45b766"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "information_id"`, undefined);
    }

}
