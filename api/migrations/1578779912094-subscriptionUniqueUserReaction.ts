/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class subscriptionUniqueUserReaction1578779912094 implements MigrationInterface {
    name = 'subscriptionUniqueUserReaction1578779912094';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f" UNIQUE ("user_id", "reaction_id")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f"`, undefined);
    }

}
