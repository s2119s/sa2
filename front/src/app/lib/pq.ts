import { Pool } from "pg";
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

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

export async function getDeadlinePassed() {
  try {
    const client = await pool.connect();
    try {
      // query by:
      // user_id == me
      // end_timestamp < current_timestamp
      const supabase = await createClient()

      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      }

      console.log(data.user.id)

      const query = `
        SELECT *
        FROM reservations
        WHERE reserved_by = CAST($1 AS UUID) AND
        end_timestamp < NOW();
      `;
      const result = await client.query(query, [data.user.id]);
      if (result.rows.length === 0) {
        // any reservations passed deadline.
        return "nothing to return"
      }

      return result
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

export async function getDeadlineNear() {
  try {
    const client = await pool.connect();
    try {
      // query by:
      // user_id == me
      // end_timestamp < current_timestamp
      const supabase = await createClient()

      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      }

      console.log(data.user.id)

      const query = `
        SELECT *
        FROM reservations
        WHERE reserved_by = CAST($1 AS UUID) AND
        end_timestamp + interval '60 minutes' < NOW();
      `;
      const result = await client.query(query, [data.user.id]);
      if (result.rows.length === 0) {
        // any reservations passed deadline.
        return "nothing near return"
      }

      return result
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

export async function getAvailable() {
  try {
    const client = await pool.connect();
    try {
      // count available pcs.
      const query = `
        SELECT *
        FROM PCs
        WHERE owned_by IS NULL;
      `;

      const result = await client.query(query);
      if (result.rows.length === 0) {
        // any available pc found.
        console.log("0 length of rows.")
      }

      return result.rows
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

export async function getList() {
  try {
    const client = await pool.connect();
    try {
      // count available pcs.
      const query = `
        SELECT *
        FROM PCs;
      `;

      const result = await client.query(query);
      if (result.rows.length === 0) {
        // any pc found.
        console.log("0 length of rows.")
      }

      return result.rows
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

export async function getNumber() {
  try {
    const client = await pool.connect();
    try {
      // count available pcs.
      const query = `
        SELECT COALESCE(COUNT(*), 0)
        FROM PCs
        WHERE owned_by IS NULL;
      `;

      const result = await client.query(query);
      if (result.rows.length === 0) {
        // any available pc found.
        console.log("0 length of rows.")
      }

      return result.rows[0].coalesce as Number;
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
