import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class removeCommentsAreaRequestImageUrl1614542156758 implements MigrationInterface {
    name = 'removeCommentsAreaRequestImageUrl1614542156758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "imageUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "imageUrl" character varying`);
    }

}
