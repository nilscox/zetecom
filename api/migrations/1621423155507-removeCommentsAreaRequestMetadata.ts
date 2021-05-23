import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCommentsAreaRequestMetadata1621423155507 implements MigrationInterface {
    name = 'removeCommentsAreaRequestMetadata1621423155507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "informationUrl"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "informationTitle"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "informationAuthor"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "informationPublicationDate"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "idetifier"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "idetifier" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "informationPublicationDate" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "informationAuthor" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "informationTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "informationUrl" character varying`);
    }

}
