import { CommentsArea, CommentsAreaStatus } from 'src/modules/comments-area/comments-area.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCommentsAreaStatus1621104795341 implements MigrationInterface {
  name = 'addCommentsAreaStatus1621104795341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "comments_area_status_enum" AS ENUM('REQUESTED', 'OPEN')`);
    await queryRunner.query(`ALTER TABLE "comments_area" ADD "status" "comments_area_status_enum"`);

    await queryRunner.manager.update(CommentsArea, {}, { status: CommentsAreaStatus.open });

    await queryRunner.query(`ALTER TABLE "comments_area" ALTER COLUMN "status" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "comments_area_status_enum"`);
  }
}
