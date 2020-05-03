const mongoose = require("mongoose");

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then((res, err) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

function disconnet() {
    return mongoose.disconnect();
}

module.exports = {connect, disconnet};
