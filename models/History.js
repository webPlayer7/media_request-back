const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    correlation_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
    },
    city: {
        type: String
    },
    states: {
        type: String  
    }
});

module.exports = mongoose.model("History", HistorySchema);