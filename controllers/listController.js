const url = require('url');
const csv = require('csv-parser');
const fs = require('fs');
const History = require('../models/History');
const {
    getTimestamp,
    getState
} = require('../utils/historySave');

module.exports = {
    async getLists(req, res) {
        const queryObject = url.parse(req.url, true).query;
        const {
            startTime,
            endTime,
            type
        } = queryObject

        // update DB
        // fs.createReadStream('input/input.csv')
        //     .pipe(csv())
        //     .on('data', (row) => {
        //         const history = new History({
        //             title: row.MediaTitle,
        //             timeStamp: getTimestamp(row.TimeStamp),
        //             country: row.CountryCode,
        //             city: row.City,
        //             states: getState(row.CountryCode, row.PostalCode)
        //         });
        //         history.save();
        //     })
        //     .on('end', async () => {
        //     });

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