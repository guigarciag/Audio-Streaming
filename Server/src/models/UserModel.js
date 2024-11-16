const mongoose = require("../configs/database");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  premium: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
