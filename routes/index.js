var express = require('express');
var router = express.Router();
var ListRouter = require('./listRouter');

router.use('list', ListRouter);

module.exports = router;
