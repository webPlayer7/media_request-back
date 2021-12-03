const url = require('url');
const Report = require('../models/Report');
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

        list = await History.aggregate([{
                $match: {
                    timeStamp: {
                        $gte: +startTime,
                        $lte: +endTime
                    }
                }
            },
            {
                $group: {
                    _id: `$${type}`,
                    total: {
                        $sum: 1
                    }
                }
            }
        ]);

        return res.status(200).send({
            'message': 'success',
            list,
        });
    },

    async getReports(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const {
            startTime,
            endTime,
            type
        } = queryObject

        let list;

        list = await Report.aggregate([{
                $match: {
                    timeStamp: {
                        $gte: +startTime,
                        $lte: +endTime
                    }
                }
            },
            {
                $group: {
                    _id: `$${type}`,
                    total: {
                        $sum: 1
                    },
                    ip: {
                        $addToSet: "$ip"
                    }
                }
            },
            {
                $project: {
                    total: 1,
                    unique: {
                        "$size": "$ip"
                    }
                }
            }
        ]);

        return res.status(200).send({
            'message': 'success',
            list,
        });        
    }
}