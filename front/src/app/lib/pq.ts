import { Pool } from "pg";

// Create a new pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export async function getRandomKey() {
  try {
    const client = await pool.connect();
    try {
      const query = `
        SELECT *
        FROM users where username=$1;
      `;
      const result = await client.query(query, ["shin"]);
      if (result.rows.length === 0) {
        throw new Error('No records found in the table');
      }

      return result.rows[0].small_path;
    }
    catch (error) {
      console.log(error)
      console.log("can't access db table. make sure access and check table is avalable.")
    }
    finally {
      client.release();
    }
  }
  catch (error) {
    console.log("An error occurced: " + error);
  }
}
