const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/media_request";

const options = {
    // reconnectTries: Number.MAX_VALUE,
    // poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

// Connects the database to the server
mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);