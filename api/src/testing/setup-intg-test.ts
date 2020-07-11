import dotenv from 'dotenv';
import { Connection, createConnection } from 'typeorm';

dotenv.config({ path: '.env.test' });

export const setupIntgTest = async () => {

  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

};
