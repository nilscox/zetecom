import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class renamePublishedToInformationPublicationDate1607815753625 implements MigrationInterface {
  name = 'renamePublishedToInformationPublicationDate1607815753625'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comments_area" ADD "information_publication_date" date');
    await queryRunner.query('ALTER TABLE "comments_area" DROP COLUMN "published"');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
