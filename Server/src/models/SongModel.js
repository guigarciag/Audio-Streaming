const mongoose = require("../configs/database");

const SongModel = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  singer: { type: String, required: true },
  background: { type: String, required: false },
  path: { type: String, required: true },
});

module.exports = mongoose.model("Song", SongModel);
