var express = require('express');
var router = express.Router();

var {
    getHistory,
    postUpload,
    deleteUpload
} = require('../controllers/uploadController');

router.get('/', getHistory);
router.post('/', postUpload);
router.delete('/', deleteUpload);

module.exports = router;