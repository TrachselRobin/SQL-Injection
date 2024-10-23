/*
  VERSION:              Robin Trachsel
  DATE:                 25.09.2024
  DESCRIPTION:          JS-Route for the backend
*/

const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('', (req, res) => {
    res.send('GET /admin')
})

module.exports = [
    router
]