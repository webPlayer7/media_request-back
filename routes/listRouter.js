var express = require('express');
var router = express.Router();
var {
    getLists
} = require('../controllers/listController');

router.get('/', getLists);

module.exports = router;