const express = require('express');
const Controller = require('../../controller/books');
const validator = require('../../validator/index');

const router = express.Router();

router.post('/', validator.create, Controller.create);
router.get('/', Controller.get);
router.get('/:id', validator.getbyId, Controller.getById);
router.patch('/:id', validator.getbyId, Controller.update);
router.delete('/:id', validator.getbyId, Controller.deleteBook);

module.exports = router;