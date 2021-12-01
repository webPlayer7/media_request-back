const {
    saveUserInfo
} = require('../utils/historySave');

module.exports = (req, res, next) => {
    if (req.originalUrl.includes(".mp4")) {
        res.redirect(303, "https://pmd.broadcastcloud.tv" + req.originalUrl);
        return saveUserInfo(req.headers['X-Real-IP'] || req.connection.remoteAddress);
    }

    next();
}