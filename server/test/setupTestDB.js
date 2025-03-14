require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER || "user",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "cd_database_test",
    password: process.env.DB_PASSWORD || "password",
    port: process.env.DB_PORT || 5432,
});

beforeAll(async () => {
    await pool.query("DROP TABLE IF EXISTS cds_test");
    await pool.query(`
    CREATE TABLE cds_test (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      year INTEGER NOT NULL
    );
  `);
});

beforeEach(async () => {
    await pool.query("DELETE FROM cds_test");
});

afterAll(async () => {
    await pool.end();
});

module.exports = pool;
