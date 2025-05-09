const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
module.exports = mongoose.model("User", userSchema);
