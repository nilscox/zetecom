import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentsAreaIntegrationIdentifierUniqueConstraint1607981059079 implements MigrationInterface {
    name = 'addCommentsAreaIntegrationIdentifierUniqueConstraint1607981059079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "comments_area_integration"."identifier" IS NULL`);
        await queryRunner.query(`ALTER TABLE "comments_area_integration" ADD CONSTRAINT "UQ_502ecc6af45738612909e7a906a" UNIQUE ("identifier")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_integration" DROP CONSTRAINT "UQ_502ecc6af45738612909e7a906a"`);
        await queryRunner.query(`COMMENT ON COLUMN "comments_area_integration"."identifier" IS NULL`);
    }

}
