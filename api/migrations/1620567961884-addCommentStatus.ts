import { MigrationInterface, QueryRunner } from 'typeorm';

import { Comment, CommentStatus } from 'src/modules/comment/comment.entity';

export class addCommentStatus1620567961884 implements MigrationInterface {
  name = 'addCommentStatus1620567961884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "comment_status_enum" AS ENUM('PENDING', 'PUBLISHED')`);
    await queryRunner.query(`ALTER TABLE "comment" ADD "status" "comment_status_enum"`);

    await queryRunner.manager.update(Comment, {}, { status: CommentStatus.published });

    await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "status" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "comment_status_enum"`);
  }
}
