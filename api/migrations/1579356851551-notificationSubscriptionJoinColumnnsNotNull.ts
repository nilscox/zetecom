/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from "typeorm";

export class notificationSubscriptionJoinColumnnsNotNull1579356851551 implements MigrationInterface {
    name = 'notificationSubscriptionJoinColumnnsNotNull1579356851551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "user_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_16addcdc44128a517daeddd4491"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "subscription_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "actor_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f" UNIQUE ("user_id", "reaction_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_16addcdc44128a517daeddd4491" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_16addcdc44128a517daeddd4491"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "actor_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "subscription_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_16addcdc44128a517daeddd4491" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "user_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f" UNIQUE ("user_id", "reaction_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
