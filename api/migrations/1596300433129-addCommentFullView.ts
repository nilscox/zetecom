import { MigrationInterface, QueryRunner } from 'typeorm';

export const up = `
CREATE OR REPLACE VIEW comment_full AS
  SELECT
    comment.*,
    information.identifier information_identifier,
    information.title information_title,
    author.nick author_nick,
    message.text message
  FROM comment comment
  LEFT JOIN information information ON comment.information_id = information.id
  LEFT JOIN "user" author ON comment.author_id = author.id
  LEFT JOIN message message ON message.comment_id = comment.id
`;

export const down = `
DROP VIEW comment_full;
`;

export class AddCommentFullView1596300433129 implements MigrationInterface {

  name = 'addCommentFullView1596300433129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(up);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(down);
  }

}
