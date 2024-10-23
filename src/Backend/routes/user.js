/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Route for the backend
*/

const express = require('express');
const validateSQL = require('./validateSQL')
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('', (req, res) => {
    const sql = "SELEdfasdCT * FROM `users` n";

    validateSQL(sql)
        .then((message) => res.send(message)); // Sends error to client
});

module.exports = router;
