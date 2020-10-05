import bcrypt from 'bcrypt';
import { QueryRunner } from 'typeorm';

import { LoggerService } from '../src/modules/logger/logger.service';
import { Seed } from '../src/modules/seed/seed.interface';

const { ADMIN_USER } = process.env;

export class CreateAdminUser implements Seed {
  name = 'createAdminUser';

  async run(queryRunner: QueryRunner, logger: LoggerService) {
    if (!ADMIN_USER) {
      logger.verbose('ADMIN_USER environment variable is not set, skipping');
      return;
    }

    const split = ADMIN_USER.split(':');

    if (split.length !== 3)
      throw new Error(`invalid ADMIN_USER format: "${ADMIN_USER}"`);

    const [nick, email, password] = split;
    const hash = await bcrypt.hash(password, 10);

    logger.verbose(`creating admin user with email "${email}" and nick "${nick}"`);

    await queryRunner.query('INSERT INTO "user" ("email", "password", "nick", "emailValidationToken", "emailValidated", "roles") VALUES ($1, $2, $3, \'\', TRUE, \'{"USER","ADMIN"}\')', [email, hash, nick]);
  }
}
