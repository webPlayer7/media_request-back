var express = require('express');
var router = express.Router();

var {
    getHistory,
    postUpload
} = require('../controllers/uploadController');

router.get('/', getHistory);
router.post('/', postUpload);

module.exports = router;