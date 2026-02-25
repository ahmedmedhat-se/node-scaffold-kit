import dotenv from "dotenv";
import mysql from "mysql2/promise.js";
dotenv.config();

const initialConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

await initialConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
console.log(`Database ${process.env.DB_NAME} ready`);

await initialConnection.end();

export const db_config = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

if (import.meta.url === `file://${process.argv[1]}`) {
    process.exit(0);
};