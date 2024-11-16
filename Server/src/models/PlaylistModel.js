const mongoose = require("../configs/database");

const PlaylistSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  owner: { type: Number, required: true },
  background: { type: String, required: false },
  songs: { type: [Number], required: false },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
