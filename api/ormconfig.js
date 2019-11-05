module.exports = {
   type: 'postgres',
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   entities: [process.env.DB_ENTITIES],
   synchronize: process.env.DB_SYNC === 'true',
   logging: process.env.DB_DEBUG === 'true',
   migrations: [process.env.DB_MIGRATIONS_DIR],
   cli: {
     migrationsDir: 'migrations'
   },
};
