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
    // Aufruf der gespeicherten Prozedur
    let query = 'CALL GetUserByName(?)';
    
    connection.query(query, [name], (error, results) => {
        if (error) {
            return res.status(500).send("Datenbankfehler");
        }
        res.json(results[0]);
    });
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
