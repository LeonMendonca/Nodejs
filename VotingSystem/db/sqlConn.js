import { createPool } from 'mysql2';

const pool = createPool({
  host:'localhost',
  user:'root',
  password:'leon2003',
  database:'Voting',
  connectionLimit:2
}).promise();

async function SqlConnect() {
  try {
    await pool.getConnection();
    return pool;
  } catch(error) {
    throw error;
  }
}


export { SqlConnect };
