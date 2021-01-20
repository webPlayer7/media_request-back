const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const History = require('../models/History');
const path = require('path');
const {
    getTimestamp,
    getState
} = require('../utils/historySave');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'input/');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

module.exports = {
    getHistory(req, res) {
        fs.readdir('input/', (err, files) => {
            const uploadedFiles = files.filter(file => file.includes('.csv'));
            return res.status(200).send({
                'message': 'success',
                'history': uploadedFiles,
            });
        });
    },
    postUpload(req, res) {
        let upload = multer({
            storage: storage
        }).single('file');

        upload(req, res, function (err) {

            // update DB
            fs.createReadStream(`input/${req.file.filename}`)
                .pipe(csv())
                .on('data', async (row) => {
                    const isExist = await History.exists({ correlation_id: row.correlation_id });
                    if (!isExist) {
                        const history = new History({
                            correlation_id: row.correlation_id,
                            title: row.MediaTitle,
                            timeStamp: getTimestamp(row.TimeStamp),
                            country: row.CountryCode,
                            city: row.City,
                            states: getState(row.CountryCode, row.PostalCode)
                        });
                        history.save();
                    }
                })
                .on('end', async () => {
                    fs.readdir('input/', (err, files) => {
                        const uploadedFiles = files.filter(file => file.includes('.csv'));
                        return res.status(200).send({
                            'message': 'success',
                            'history': uploadedFiles,
                        });
                    });
                });
        })
    },
    deleteUpload(req, res) {
        History.collection.deleteMany({});
        fs.readdir('input/', (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join('input/', file), err => {
                    if (err) throw err;
                });
            }
        });
        return res.status(200).send({
            'message': 'deleted',
        });
    }
}