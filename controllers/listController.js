const url = require('url');
const History = require('../models/History');

module.exports = {
    async getLists(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const {
            startTime,
            endTime,
            type
        } = queryObject

        let list;

        list = await History.aggregate([
            {
                $match: {
                    timeStamp: {
                        $gte: +startTime,
                        $lte: +endTime
                    }
                }
            },
            { $group: { _id: `$${type}`, total: { $sum: 1 } } }
        ]);

        return res.status(200).send({
            'message': 'success',
            list,
        });
    }
}