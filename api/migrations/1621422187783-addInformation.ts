import { CommentsAreaInformation } from 'src/modules/comments-area/comments-area-information.entity';
import {MigrationInterface, QueryRunner} from "typeorm";

export class addInformation1621422187783 implements MigrationInterface {
    name = 'addInformation1621422187783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments_area_information" ("id" SERIAL NOT NULL, "media" "comments_area_information_media_enum", "title" character varying, "url" character varying, "publicationDate" character varying, "author" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76d3427244ed6515391db857401" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_id" integer`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD CONSTRAINT "UQ_d1243644b73cd52f0920a5d210d" UNIQUE ("information_id")`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD CONSTRAINT "FK_d1243644b73cd52f0920a5d210d" FOREIGN KEY ("information_id") REFERENCES "comments_area_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        const commentsAreas = await queryRunner.query(`SELECT * FROM "comments_area"`);

        for (const commentsArea of commentsAreas) {
            const information = await queryRunner.manager.insert(CommentsAreaInformation, {
                url: commentsArea.information_url,
                title: commentsArea.information_title,
                author: commentsArea.information_author,
                media: commentsArea.information_media,
                publicationDate: commentsArea.information_publication_date,
                created: commentsArea.created,
                updated: commentsArea.updated,
            });

            await queryRunner.manager.query(`UPDATE "comments_area" SET "information_id" = ${information.identifiers[0].id} WHERE "id" = ${commentsArea.id}`);
        }

        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_url"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_title"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_author"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_publication_date"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_media"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" DROP CONSTRAINT "FK_d1243644b73cd52f0920a5d210d"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP CONSTRAINT "UQ_d1243644b73cd52f0920a5d210d"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "information_id"`);
        await queryRunner.query(`DROP TABLE "comments_area_information"`);

        await queryRunner.query(`CREATE TYPE "public"."comments_area_information_media_enum" AS ENUM('20minutes', 'francesoir', 'lefigaro', 'lemonde', 'leparisien', 'lepoint', 'lesechos', 'liberation', 'scienceetvie', 'skeptikon', 'youtube')`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_media" "comments_area_information_media_enum"`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_publication_date" date`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_author" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_title" character varying`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "information_url" character varying`);
    }

}
