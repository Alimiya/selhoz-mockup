const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')
const verify = require('../../middlewares/authVerify')

router.get('/',verify, Controller.getAllUsers)
router.get('/:id',verify, Controller.getUserById)
router.post('/',verify, Controller.createUser)
router.put('/:id',verify, Controller.updateUserById)
router.delete('/:id',verify, Controller.deleteUserById)

module.exports = router