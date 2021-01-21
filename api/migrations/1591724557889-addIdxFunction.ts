import { MigrationInterface, QueryRunner } from 'typeorm';

export const up = `
CREATE OR REPLACE FUNCTION idx(anyarray, anyelement)
  RETURNS INT AS
$$
  SELECT i FROM (
     SELECT generate_series(array_lower($1,1),array_upper($1,1))
  ) g(i)
  WHERE $1[i] = $2
  LIMIT 1;
$$ LANGUAGE SQL IMMUTABLE;
`;

export const down = `
DROP FUNCTION idx;
`;

export class AddIdxFunction1591724557889 implements MigrationInterface {
  name = 'addIdxFunction1591724557889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(up);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(down);
  }
}
