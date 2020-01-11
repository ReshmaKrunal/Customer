const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

url = "mongodb://localhost:27017/CustomerInfo";
db = mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

module.exports = db;
