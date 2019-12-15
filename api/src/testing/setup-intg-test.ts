import { Connection, createConnection } from 'typeorm';

export const setupIntgTest = async () => {

  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      database: 'test',
      dropSchema: true,
      entities: ['src/**/*.entity.ts'],
      host: 'localhost',
      // logging: ['query', 'error'],
      password: 'root',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'root',
    });
  });

  afterAll(async () => {
    await connection.close();
  });
};
