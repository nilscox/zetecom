import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReactionScore1576697743001 implements MigrationInterface {
    name = 'addReactionScore1576697743001';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reaction" ADD "score" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "score"`, undefined);
    }

}
