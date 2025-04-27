const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new mongoose.Schema({
  flight: { type: Schema.Types.ObjectId, ref: "Flight" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  feedback: String,
  details: {
    crew: Number,
    cleanliness: Number,
    food: Number,
    takeoff: Number,
    landing: Number,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Review", reviewSchema);
