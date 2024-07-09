"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'todolist_test',
    password: process.env.PGPASSWORD || 'dofa',
    port: Number(process.env.PGPORT) || 5432
});
exports.default = pool;
