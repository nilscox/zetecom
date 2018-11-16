module.exports.development = {
  host: process.env.CDV_DB_HOST,
  username: process.env.CDV_DB_USER,
  password: process.env.CDV_DB_PASSWORD,
  database: process.env.CDV_DB_NAME,
  dialect: 'postgres',
};
