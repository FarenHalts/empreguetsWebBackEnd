const mysql = require('mysql2');
require('dotenv').config()


module.exports = {
    connection: () => {
        return mysql.createConnection({
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS
        }).promise()
    }
}