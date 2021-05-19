import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCommentsAreaMetadata1621422187783 implements MigrationInterface {
    name = 'removeCommentsAreaMetadata1621422187783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_url"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_title"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_author"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_publication_date"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_media"`);
        await queryRunner.query(`DROP TYPE "public"."comments_area_information_media_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."comments_area_information_media_enum" AS ENUM('20minutes', 'francesoir', 'lefigaro', 'lemonde', 'leparisien', 'lepoint', 'lesechos', 'liberation', 'scienceetvie', 'skeptikon', 'youtube')`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_media" "comments_area_information_media_enum"`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_publication_date" date`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_author" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_url" character varying NOT NULL`);
    }

}
