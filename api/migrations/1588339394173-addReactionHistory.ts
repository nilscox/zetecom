/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReactionHistory1588339394173 implements MigrationInterface {
    name = 'addReactionHistory1588339394173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" ADD "message_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "UQ_9276e74bb0d8be2c75ec3b51e61" UNIQUE ("message_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "UQ_9276e74bb0d8be2c75ec3b51e61"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "message_id"`, undefined);
    }

}
