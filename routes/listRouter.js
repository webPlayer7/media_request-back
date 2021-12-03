var express = require('express');
var router = express.Router();
var {
    getLists,
    getReports
} = require('../controllers/listController');

router.get('/', getLists);
router.get('/v2', getReports);

module.exports = router;