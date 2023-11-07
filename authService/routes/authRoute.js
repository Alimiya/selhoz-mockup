const express = require('express')
const router = express.Router()
const Controller = require('../controllers/authController')

router.post('/login', Controller.login)
router.post('/register', Controller.register)

module.exports = router