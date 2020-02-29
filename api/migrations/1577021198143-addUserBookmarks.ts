/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserBookmarks1577021198143 implements MigrationInterface {
    name = 'addUserBookmarks1577021198143';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "reaction_id" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_8f1a143c6ba8bba0e2a4f41e0d0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_54918d438262272493c96d916cb" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_54918d438262272493c96d916cb"`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_8f1a143c6ba8bba0e2a4f41e0d0"`, undefined);
        await queryRunner.query(`DROP TABLE "bookmark"`, undefined);
    }

}
