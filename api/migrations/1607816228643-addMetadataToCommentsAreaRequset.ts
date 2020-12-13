import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMetadataToCommentsAreaRequset1607816228643 implements MigrationInterface {
  name = 'addMetadataToCommentsAreaRequset1607816228643'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comments_area_request" ALTER COLUMN "identifier" DROP NOT NULL');

    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "informationUrl" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "informationTitle" character varying');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "informationAuthor" character varying');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "informationPublicationDate" character varying');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "idetifier" character varying');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "imageUrl" character varying');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD "moderator_id" integer');
    await queryRunner.query('ALTER TABLE "comments_area_request" ADD CONSTRAINT "FK_ef4542f66b8c64a6eae9621d84d" FOREIGN KEY ("moderator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
