/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSubscriptionsAndNotifications1577734877699 implements MigrationInterface {
    name = 'addSubscriptionsAndNotifications1577734877699';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "information_id" integer, "reaction_id" integer, "subject_id" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "seen" TIMESTAMP, "created" TIMESTAMP NOT NULL DEFAULT now(), "subscription_id" integer, "actor_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_6d59c2b6c5164dea5d23b6e5461" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_82e408d3a1b1e1e5f0d5e7bd5d6" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cd1b58065d061ad5a6122a4458d" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_16addcdc44128a517daeddd4491" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_16addcdc44128a517daeddd4491"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cd1b58065d061ad5a6122a4458d"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_82e408d3a1b1e1e5f0d5e7bd5d6"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_6d59c2b6c5164dea5d23b6e5461"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`, undefined);
        await queryRunner.query(`DROP TABLE "notification"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"`, undefined);
    }

}
