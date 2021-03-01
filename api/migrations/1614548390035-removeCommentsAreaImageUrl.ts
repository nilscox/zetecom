import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class removeCommentsAreaImageUrl1614548390035 implements MigrationInterface {
    name = 'removeCommentsAreaImageUrl1614548390035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP COLUMN "imageUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD "imageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "image_url" character varying`);
    }

}
