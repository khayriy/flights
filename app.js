const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const app = express();
require("dotenv").config();
const Port = process.env.Port || 3000;
// app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/flights", require("./routes/flights"));
app.use("/reviews", require("./routes/review"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo err", err));
app.listen(Port, () => console.log(`🚀 server running on localhost:${Port}`));
