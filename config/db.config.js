const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const connect = (result) => {
    mongoose.connect(url).then(() => {
        result();
    }).catch((error) => {
        console.log("==>>", error)
    })
}
module.exports = connect;