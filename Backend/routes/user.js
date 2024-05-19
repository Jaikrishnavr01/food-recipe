const express = require('express')

const{signup,  activate} = require('../controllers/Auth_Controller')

const bodyparser = require('body-parser')

const router = express.Router()
router.use(bodyparser.json())

router.post('/signup', signup)

router.get('/activate/:activationCode', activate)

module.exports = router
