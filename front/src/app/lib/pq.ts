import { Pool } from "pg";
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import { exec } from "child_process";

// Create a new pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function execQuery(query: string, ...params: string[]) {
  const client = await pool.connect();
  try {
    return await client.query(query, params);

  }
  catch (error) {
    throw new Error("[execQuery] " + error)
  }
  finally {
    client.release();
  }
}

export async function getPCfromUUID(uuid: string) {
  try {
    const query = `
    SELECT *
    FROM PCs where id=$1`;
    const result = await execQuery(query, uuid)

    return result
  }
  catch (error) {
    console.log("[getPCfromUUID] " + error)
  }
}

export async function getReservationsfromUUID(uuid: string) {
  try {
    const query = `
    SELECT *
    FROM reservations where pc_id=$1`;
    const result = await execQuery(query, uuid)

    return result
  }
  catch (error) {
    console.log("[getPCfromUUID] " + error)
  }
}

export async function addReservation(pc_uuid: string, user_uuid: string, start: Date, end: Date) {
  try {
    const check_query = `
    SELECT *
    FROM reservations
    WHERE pc_id = $1 AND (
    start_timestamp <= $2 AND $3 <= end_timestamp OR
    $2 <= start_timestamp AND start_timestamp <= $3 OR
    $2 <= end_timestamp AND end_timestamp <= $3)`;
    const check_result = await execQuery(check_query, pc_uuid, start.toISOString(), end.toISOString())

    if (check_result.rowCount != 0) {
      throw new Error("Duplicate Reservation")
    }

    const query = `
    INSERT INTO reservations (pc_id, reserved_by, start_timestamp, end_timestamp) VALUES ($1,$2,$3,$4);`

    const result = await execQuery(query, pc_uuid, user_uuid, start.toISOString(), end.toISOString())

    return result
  }
  catch (error) {
    console.log("[addReservation] " + error)
  }
}

export async function removeReservation(uuid: string) {
  try {
    const query = `DELETE FROM reservations WHERE id=$1`
    return await execQuery(query, uuid);
  }
  catch (error) {
    console.log("[removeReservation] " + error)
  }
}

//TODO remove this function. this function is for debug.
export async function getQuery(query: string, ...params: string[]) {
  try {
    const result = await execQuery(query, ...params);
    if (result.rows.length === 0) {
      throw new Error('No records found in the table');
    }

    return result;
  }
  catch (error) {
    console.log("[getQuery] " + error);
  }
}

export async function getRandomKey() {
  try {
    const query = `
        SELECT *
        FROM users where username=$1;
      `;

    const result = await execQuery(query, "shin");
    if (result.rows.length === 0) {
      throw new Error('No records found in the table');
    }

    return result.rows[0].small_path;
  }
  catch (error) {
    console.log("[getRandomKey]: " + error);
  }
}

export async function getDeadlinePassed() {
  try {
    // query by:
    // user_id == me
    // end_timestamp < current_timestamp
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    const query = 

`
        SELECT * FROM PCs 
WHERE id IN (
    SELECT pc_id
    FROM reservations
    WHERE reserved_by = CAST($1 AS UUID)
      AND CAST(end_timestamp AS DATE) <= CAST(NOW() AS DATE)
);

       `;
    const result = await execQuery(query, data.user.id);
    if (result.rowCount === 0) {
    }

    return result
  }
  catch (error) {
    console.log("[getDeadlinePassed] " + error);
  }
}

export async function getDeadlinePassed2() {
  try {
    // query by:
    // user_id == me
    // end_timestamp < current_timestamp
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    const query = 

`
      
    SELECT *
    FROM reservations
    WHERE reserved_by = CAST($1 AS UUID)
      AND CAST(end_timestamp AS DATE) <= CAST(NOW() AS DATE);

       `;
    const result = await execQuery(query, data.user.id);
    if (result.rowCount === 0) {
    }

    return result
  }
  catch (error) {
    console.log("[getDeadlinePassed] " + error);
  }
}

export async function getDeadlineNear() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    const query = `
         SELECT * FROM PCs 
WHERE id IN (SELECT pc_id
FROM reservations
WHERE reserved_by = CAST($1 AS UUID)
  AND end_timestamp >= NOW() AT TIME ZONE 'ASIA/TOKYO'
  AND end_timestamp - interval '1 hour' <= NOW() AT TIME ZONE 'ASIA/TOKYO');

      `;
    const result = await execQuery(query, data.user.id)
    if (result.rowCount === 0) {
    }

    return result
  }
  catch (error) {
    console.log("[getDeadlineNear] " + error);
  }
}

export async function getDeadlineNear2() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    const query = `
      
     SELECT *
FROM reservations
WHERE reserved_by = CAST($1 AS UUID)
  AND end_timestamp >= NOW() AT TIME ZONE 'ASIA/TOKYO'
  AND end_timestamp - interval '1 hour' <= NOW() AT TIME ZONE 'ASIA/TOKYO';

      `;
    const result = await execQuery(query, data.user.id)
    if (result.rowCount === 0) {
    }

    return result
  }
  catch (error) {
    console.log("[getDeadlineNear] " + error);
  }
}

export async function getAvailable() {
  try {
    const query = `
        SELECT *
        FROM PCs
        WHERE owned_by IS NULL;
      `;

    const result = await execQuery(query)
    if (result.rows.length === 0) {
      console.log("no available pcs.")
    }

    return result.rows
  }
  catch (error) {
    console.log("[getAvailable] " + error);
  }
}

export async function getList() {
  try {
    const query = `
        SELECT *
        FROM PCs;
      `;

    const result = await execQuery(query)
    if (result.rows.length === 0) {
      console.log("0 length of rows.")
    }

    return result.rows
  }
  catch (error) {
    console.log("An error occurced: " + error);
  }
}

export async function getNumber() {
  try {
    const query = `
        SELECT COALESCE(COUNT(*), 0)
        FROM PCs
        WHERE owned_by IS NULL;
      `;

    const result = await execQuery(query)
    if (result.rows.length === 0) {
      // any available pc found.
      console.log("0 length of rows.")
    }

    return result.rows[0].coalesce as Number;
  }
  catch (error) {
    console.log("An error occurced: " + error);
  }
}