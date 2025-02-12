import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config'
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env
const config = { 
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    alloExitOnIdle: true
 }
const pool = new Pool(config);


export default pool;