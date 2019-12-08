import { Connection } from 'typeorm';

import { createDatabaseConnection } from './create-database-connection';

export const setupIntgTest = async () => {

  let connection: Connection;

  beforeAll(async () => {
    connection = await createDatabaseConnection();
  });

  afterAll(async () => {
    await connection.close();
  });
};
