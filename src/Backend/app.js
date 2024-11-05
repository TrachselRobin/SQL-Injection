/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Server for the backend

  Allowed URLs:
  - *
*/

const express = require('express')
const cors = require('cors')
const users = require('./routes/users.js');
const admin = require('./routes/admin.js');
const user = require('./routes/user.js');

const app = express()
const host = '0.0.0.0'
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true }))
app.use(logger)

app.use('/admin', admin)
app.use('', user)

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Endpoint not found' })
})

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})

function logger(req, res, next) {
  console.log(`${req.method} request for ${req.url}`)
  next()
}