/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Server for the backend

  Allowed URLs:
  - *
*/

const express = require('express')
const admin   = require('./routes/admin')
const user    = require('./routes/user')

const app = express()
const host = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(requestInfo)

app.use('/admin', admin)
app.use('/', user)

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' })
})

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})

function requestInfo(req, res, next) {
    console.log(`Request: ${req.method} ${req.url}`)
    next()
}