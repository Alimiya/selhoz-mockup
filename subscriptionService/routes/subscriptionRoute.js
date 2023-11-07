const express = require('express')
const router = express.Router()
const Controller = require('../controllers/subscriptionController')
const verify = require('../../middlewares/authVerify')
const checkSubscription = require('../../middlewares/checkSubscription')

router.post('/:userId/:plan',verify, checkSubscription, Controller.buySubscription)

module.exports = router