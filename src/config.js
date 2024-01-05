require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

module.exports = dbConfig;
