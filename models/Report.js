const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    states: {
        type: String,
        required: true
    },    
    zip: {
        type: String,
    }
});

module.exports = mongoose.model("Report", ReportSchema)