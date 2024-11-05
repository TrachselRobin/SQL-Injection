const mysql = require('mysql');
const express = require('express');
const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

app.get('/user', (req, res) => {
    let name = req.query.name;
    // Bereinigen von Eingaben durch REPLACE in MySQL
    let query = `SELECT * FROM users WHERE name = REPLACE('${name}', "'", "\\'")`;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send("Datenbankfehler");
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});