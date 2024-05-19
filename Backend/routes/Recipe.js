const express = require('express');
const { create, getById, updateById, deleteById } = require('../controllers/Recipe_Controller');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/recipes', create);

router.get('/recipes/:id', getById);

router.put('/recipes/:id', updateById);

router.delete('/recipes/:id', deleteById);

module.exports = router;