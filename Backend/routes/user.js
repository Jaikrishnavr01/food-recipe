const express = require('express')

const{signup} = require('../controllers/Auth_Controller')

const bodyparser = require('body-parser')

const router = express.Router()
router.use(bodyparser.json())

router.post('/signup', signup)

module.exports = router
