/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAuthorizedEmail1572813828824 implements MigrationInterface {
    name = 'addAuthorizedEmail1572813828824';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authorized_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b5be93df590a94dc9f61252165a" UNIQUE ("email"), CONSTRAINT "PK_2938f9b1fe95c1531b56f22a621" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "authorized_email"`, undefined);
    }

}
