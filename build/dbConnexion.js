"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'todolist_test',
    password: process.env.PGPASSWORD || 'dofa',
    port: Number(process.env.PGPORT) || 5432,
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUPzhzObXnVt2zJsnd02mOkGVc9CUwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNTYxMmIyMzktZjA2Yy00NDIyLWE1M2QtNzkzMTM1YmVh
NTQwIFByb2plY3QgQ0EwHhcNMjQwNzA5MTgwOTE5WhcNMzQwNzA3MTgwOTE5WjA6
MTgwNgYDVQQDDC81NjEyYjIzOS1mMDZjLTQ0MjItYTUzZC03OTMxMzViZWE1NDAg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJRt9YyJ
GuXjxLJ6AK1IHbjMKgg96TmVtOC0b6PrSU5/AcikkDXwL+GNAwZlZyMWzHkW8nfG
DlvzlhcVE7iwPtLNrrqI6YSalPBOF60lyOSzuWJx3zR6s6woJ+CADhiouYKUXQYu
ELFbskoDQ/DIWbNH/eMC40LQem+wzUrsC9noKe7wJN7xqNlFXNUHgAnMGUOn8CmT
Bw7D7lZ6ryYAfXWtrEMLzgypsPeHSUnsRUGBEjvUZITezrHP0UflTI8e3ZMxDDa1
4yk2/Xoseng+aRQKEaP/s4dOqDI4UJtHq1lEq2KigIQIdX2iKzoQbkzhXUGze6Ao
Sghz7OJxBz08MgHKgV3nnbZLR1ayXUO0K8y1tL1zK1uT3ciPkaav77RMd6N2cust
Yl0jAVfGsDVx6T3igYaD0iNt4FmLnWXlkx9J+TxqZlz1tLsv1o3fuZWP5BzBL1rr
HTrDULDZbEzWJl/Pr2fyFJTgMy2pihAJhnFNTy+HR7gCIaKOwJ8YdiOQ1QIDAQAB
oz8wPTAdBgNVHQ4EFgQUUKj7NIBpN4i2S5IzS7rBfr5mZbcwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACwgyaj2LxcTg2FO
Jj9tzZWaLrkM/HHNrViHDtiiGgGe1I5CV1QKTrTC8P6p4+YJZj+ItYK2PrhgwURE
WNXT6YVZRvT9XJKJlWAQogRWOQwonj4eW1uSQQBFlbzJoAYcGnQhGL7BaNT0T2ft
xco6yuuhdoW2AWh6RBJoK7vwd18bjSpWJzxLzIm7fsFL2GzmrWqN0gXiqg0UK7nM
AqjeEIC9Pq6uu6hOjnzEwZGYk0INpX6RLFUj4tNtyDlEgaiQhkAbXUIJRc4QVwS9
TaYY7y4bk/WGN9lWciFcm30T5sUlixpR7FDXEE4bfzc+maSht2lPwkI1eiOcZaQF
Ek6+ia+TXIb9/5rgOl+jVq4uFeAbOwwDUuLulX/CzPVLsDjQBBv8yjdNoyNxhwo5
XlF0k10WUFPe4QGf8iBR/BA0/4q0ns6aBHmHFiTgi1sYCfpV6Q0XPjB1u/noV48Z
3NnGkscc1j8lKDSBd9/nnLqUOQyQ9NsH2YG6/M64vx4+EXnZQw==
-----END CERTIFICATE-----`
    }
});
exports.default = pool;
