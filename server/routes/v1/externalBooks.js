const express = require('express');
const Controller = require('../../controller/externalBooks');

const router = express.Router();

router.get('/', Controller.getBooks);

module.exports = router;