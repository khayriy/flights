const mongoose = require("mongoose");
const { Schema } = mongoose;
const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: Number,
  from: String,
  to: String,
  departureDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Flight", flightSchema);
