const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const server = express();
const PORT = 5000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host:     DB_HOST,
    user:     DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});
connection.connect();

connection.query(
    "SELECT name FROM Artists",
    function (error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            const rows = JSON.parse(JSON.stringify(result));
            console.log(rows);
        }
    }
);

/*server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});*/