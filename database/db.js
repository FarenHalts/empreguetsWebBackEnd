const mysql = require('mysql2');
require('dotenv').config()


module.exports = {
    connection: () => {
        return mysql.createConnection({
            host: "35.198.50.41",
            user: "empreguets",
            database: "db_empreguets",
            password: "emprecats"
        }).promise()
    }
}