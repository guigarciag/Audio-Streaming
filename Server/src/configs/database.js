const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/player";
//pode ser que funcione tambpém com localhost
//const url = 'mongodb://localhost:27017/pessoas'
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
