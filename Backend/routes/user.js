const express = require('express')

const{signup,  activate , signin, allusers,  findUserById, deleteUserById} = require('../controllers/Auth_Controller')

const bodyparser = require('body-parser')

const router = express.Router()
router.use(bodyparser.json())

router.post('/signup', signup)

router.get('/activate/:activationCode', activate)

router.post('/signin', signin)

//

router.get('/users', allusers);

router.get('/users/:id', findUserById);

router.delete('/users/:id', deleteUserById);

module.exports = router


