/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Route for the backend
*/

const express = require('express');
const validateSQL = require('./validateSQL')
const users = require('./users.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  const username = "'; DROP TABLE users;";
  const sql = "SELECT * FROM users WHERE username = '" + username + "'";
  // sql = "SELECT * FROM users WHERE username = ''; DROP TABLE users;";

  validateSQL(sql, username).then((message) => res.send(message)); // Sends error to client
});

router.get('/login/:username', (req, res) => {
  const username = req.params.username;
  const gamename = "Name";
  const sql = "SELECT * FROM `users` WHERE `username` = '" + username + "'";

  validateSQL(sql, gamename).then((message) => res.send(message));
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const gamename = req.body.gamename;
  const sql = "SELECT * FROM `users` WHERE `username` = '" + username + "'";

  validateSQL(sql, gamename).then((message) => res.send(message));
});

module.exports = router;
