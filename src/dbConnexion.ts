import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'todolist_test',
    password: process.env.PGPASSWORD || 'dofa',
    port: Number(process.env.PGPORT) || 5432
});

export default pool;
