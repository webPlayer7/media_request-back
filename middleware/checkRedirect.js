const {
    saveUserInfo
} = require('../utils/historySave');

module.exports = (req, res, next) => {
    if (req.originalUrl.includes(".mp4")) {
        res.redirect(303, "https://pmd.broadcastcloud.tv" + req.originalUrl);
        console.log(req.headers)
        return saveUserInfo(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    }

    next();
}