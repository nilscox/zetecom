import { createConnection } from 'typeorm';

export const createDatabaseConnection = async () => {
  return createConnection({
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
};
