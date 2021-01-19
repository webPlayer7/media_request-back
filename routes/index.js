var express = require('express');
var router = express.Router();
var ListRouter = require('./listRouter');
var UploadRouter = require('./uploadRouter');

router.use('/list', ListRouter);
router.use('/upload', UploadRouter);

module.exports = router;
