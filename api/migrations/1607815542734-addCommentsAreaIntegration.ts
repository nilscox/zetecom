import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class addCommentsAreaIntegration1607815542734 implements MigrationInterface {
  name = 'addCommentsAreaIntegration1607815542734'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE "comments_area" CASCADE');

    await queryRunner.query('CREATE TABLE "comments_area_integration" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "comments_area_id" integer, CONSTRAINT "REL_78ab8d3c75bb53edd2bb2a0a91" UNIQUE ("comments_area_id"), CONSTRAINT "PK_b0e197675245b3ff5423fab9f4c" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "comments_area_integration" ADD CONSTRAINT "FK_78ab8d3c75bb53edd2bb2a0a91b" FOREIGN KEY ("comments_area_id") REFERENCES "comments_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "comments_area" DROP CONSTRAINT "UQ_61c504d5b89db6ae455ec6f5d5a"');
    await queryRunner.query('ALTER TABLE "comments_area" DROP COLUMN "identifier"');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
