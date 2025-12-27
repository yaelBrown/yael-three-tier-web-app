const mysql = require("mysql2/promise")
const CONSTANTS = require("./constants")

const pool = mysql.createPool({
    host: CONSTANTS.DB_ADDR,
    port: Number(CONSTANTS.DB_PORT),
    user: CONSTANTS.DB_USER,
    password: CONSTANTS.DB_PASSWORD,
    database: CONSTANTS.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(CONSTANTS.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
})

module.exports = pool;