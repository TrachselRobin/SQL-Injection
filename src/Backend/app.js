/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Server for the backend

  Allowed URLs:
  - *
*/

const express = require('express')
// const validateSQL = require('./routes/validateSQL');
const admin = require('./routes/admin.js');
const user = require('./routes/user.js');

const app = express()
const host = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin', admin)
app.use('/', user)

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' })
})

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})

let users = [
    {
        name: 'Robin Trachsel',
        requests: [
            {
                date: '2024-09-25',
                time: '12:00:00',
                endpoint: '/user',
                method: 'GET'
            },
            {
                date: '2024-09-25',
                time: '12:00:00',
                endpoint: '/user',
                method: 'POST'
            }
        ],
        sql: [
            {
                date: '2024-09-25',
                time: '12:00:00',
                query: 'SELECT * FROM users',
                valid: true
            }
        ]
    },
    {
        name: 'New User',
        requests: [],
        sql: []
    }
]

module.exports = users