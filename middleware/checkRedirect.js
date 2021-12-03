const path = require('path');
const {
    saveUserInfo
} = require('../utils/historySave');

module.exports = (req, res, next) => {
    if (req.originalUrl.includes(".mp")) {
        res.redirect(303, process.env.MEDIA_URL + req.originalUrl);
        const ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const guid = path.basename(req.originalUrl).split("_")[0];
        return saveUserInfo(ipaddress, guid);
    }

    next();
}