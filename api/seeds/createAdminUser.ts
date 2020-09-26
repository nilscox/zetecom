import bcrypt from 'bcrypt';
import { QueryRunner } from 'typeorm';

import { Seed } from '../src/modules/seed/seed.interface';

const { ADMIN_USER } = process.env;

export class CreateAdminUser implements Seed {
  name = 'createAdminUser';

  async run(queryRunner: QueryRunner) {
    if (!ADMIN_USER)
      return;

    const split = ADMIN_USER.split(':');

    if (split.length !== 3)
      throw new Error(`invalid ADMIN_USER format: "${ADMIN_USER}"`);

    const [nick, email, password] = split;
    const hash = await bcrypt.hash(password, 10);

    await queryRunner.query('INSERT INTO "user" ("email", "password", "nick", "emailValidationToken", "emailValidated", "roles") VALUES ($1, $2, $3, \'\', TRUE, \'{"USER","ADMIN"}\')', [email, hash, nick]);
  }
}
