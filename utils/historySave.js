const axios = require('axios');
const fs = require('fs');
const Report = require('../models/Report');

module.exports = {
    getTimestamp(time) {
        return new Date(time).getTime();
    },

    getState(countryCode, zipcode) {
        if (countryCode == "US" && zipcode) {
            if (zipcode >= 35000 && zipcode <= 36999) {
                st = 'AL';
            } else if (zipcode >= 99500 && zipcode <= 99999) {
                st = 'AK';
            } else if (zipcode >= 85000 && zipcode <= 86999) {
                st = 'AZ';
            } else if (zipcode >= 71600 && zipcode <= 72999) {
                st = 'AR';
            } else if (zipcode >= 90000 && zipcode <= 96699) {
                st = 'CA';
            } else if (zipcode >= 80000 && zipcode <= 81999) {
                st = 'CO';
            } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
                st = 'CT';
            } else if (zipcode >= 19700 && zipcode <= 19999) {
                st = 'DE';
            } else if (zipcode >= 32000 && zipcode <= 34999) {
                st = 'FL';
            } else if ((zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999)) {
                st = 'GA';
            } else if (zipcode >= 96700 && zipcode <= 96999) {
                st = 'HI';
            } else if (zipcode >= 83200 && zipcode <= 83999) {
                st = 'ID';
            } else if (zipcode >= 60000 && zipcode <= 62999) {
                st = 'IL';
            } else if (zipcode >= 46000 && zipcode <= 47999) {
                st = 'IN';
            } else if (zipcode >= 50000 && zipcode <= 52999) {
                st = 'IA';
            } else if (zipcode >= 66000 && zipcode <= 67999) {
                st = 'KS';
            } else if (zipcode >= 40000 && zipcode <= 42999) {
                st = 'KY';
            } else if (zipcode >= 70000 && zipcode <= 71599) {
                st = 'LA';
            } else if (zipcode >= 3900 && zipcode <= 4999) {
                st = 'ME';
            } else if (zipcode >= 20600 && zipcode <= 21999) {
                st = 'MD';
            } else if ((zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501)) {
                st = 'MA';
            } else if (zipcode >= 48000 && zipcode <= 49999) {
                st = 'MI';
            } else if (zipcode >= 55000 && zipcode <= 56899) {
                st = 'MN';
            } else if (zipcode >= 38600 && zipcode <= 39999) {
                st = 'MS';
            } else if (zipcode >= 63000 && zipcode <= 65999) {
                st = 'MO';
            } else if (zipcode >= 59000 && zipcode <= 59999) {
                st = 'MT';
            } else if (zipcode >= 27000 && zipcode <= 28999) {
                st = 'NC';
            } else if (zipcode >= 58000 && zipcode <= 58999) {
                st = 'ND';
            } else if (zipcode >= 68000 && zipcode <= 69999) {
                st = 'NE';
            } else if (zipcode >= 88900 && zipcode <= 89999) {
                st = 'NV';
            } else if (zipcode >= 3000 && zipcode <= 3899) {
                st = 'NH';
            } else if (zipcode >= 7000 && zipcode <= 8999) {
                st = 'NJ';
            } else if (zipcode >= 87000 && zipcode <= 88499) {
                st = 'NM';
            } else if ((zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390)) {
                st = 'NY';
            } else if (zipcode >= 43000 && zipcode <= 45999) {
                st = 'OH';
            } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999)) {
                st = 'OK';
            } else if (zipcode >= 97000 && zipcode <= 97999) {
                st = 'OR';
            } else if (zipcode >= 15000 && zipcode <= 19699) {
                st = 'PA';
            } else if (zipcode >= 300 && zipcode <= 999) {
                st = 'PR';
            } else if (zipcode >= 2800 && zipcode <= 2999) {
                st = 'RI';
            } else if (zipcode >= 29000 && zipcode <= 29999) {
                st = 'SC';
            } else if (zipcode >= 57000 && zipcode <= 57999) {
                st = 'SD';
            } else if (zipcode >= 37000 && zipcode <= 38599) {
                st = 'TN';
            } else if ((zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) || (zipcode >= 88500 && zipcode <= 88599)) {
                st = 'TX';
            } else if (zipcode >= 84000 && zipcode <= 84999) {
                st = 'UT';
            } else if (zipcode >= 5000 && zipcode <= 5999) {
                st = 'VT';
            } else if ((zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598)) {
                st = 'VA';
            } else if ((zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999)) {
                st = 'DC';
            } else if (zipcode >= 98000 && zipcode <= 99499) {
                st = 'WA';
            } else if (zipcode >= 24700 && zipcode <= 26999) {
                st = 'WV';
            } else if (zipcode >= 53000 && zipcode <= 54999) {
                st = 'WI';
            } else if (zipcode >= 82000 && zipcode <= 83199) {
                st = 'WY';
            } else {
                st = 'none';
                console.log('No state found matching', zipcode);
            }
            return st;
        }
        return null;
    },

    async saveUserInfo(ip, guid) {
        try {
            fs.readFile('feed/feed.json', 'utf8', async (err, feed) => {
                if (err) return console.log(err);
                const {
                    entries
                } = JSON.parse(feed);
                const media = entries.filter(entry => entry.guid === guid);
                const title = media.length ? media[0].title : "Unknown";

                const {
                    data
                } = await axios.get(`${process.env.GEO_IP_URL}/${ip}`);
                const {
                    status,
                    countryCode,
                    region,
                    city,
                    zip
                } = data;
                if (status === "success") {
                    await new Report({
                        title,
                        ip,
                        timeStamp: new Date().getTime(),
                        country: countryCode,
                        states: region,
                        city,
                        zip
                    }).save();
                } else {
                    await new Report({
                        title,
                        ip,
                        timeStamp: new Date().getTime(),
                        country: "Unknown",
                        states: "Unknown",
                        city: "Unknown",
                        zip: "Unknown"
                    }).save();
                }
            });
        } catch (error) {
            console.log(error.message)
        }
    },

    async saveFeed() {
        try {            
            const feed = await axios.get(`${process.env.FEED_URL}`);
            feed.data.entries.length && fs.writeFileSync('feed/feed.json', JSON.stringify(feed.data, null, 4));
        } catch (error) {
            console.log(error.message)
        }
    }
}