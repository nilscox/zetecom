import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentsAreaMediaType1613418781686 implements MigrationInterface {
    name = 'addCommentsAreaMediaType1613418781686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "comments_area_information_media_enum" AS ENUM('20minutes', 'francesoir', 'lefigaro', 'lemonde', 'leparisien', 'lepoint', 'lesechos', 'liberatio', 'scienceetvie', 'skeptikon', 'youtube')`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_media" "comments_area_information_media_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_media"`);
        await queryRunner.query(`DROP TYPE "comments_area_information_media_enum"`);
    }

}
