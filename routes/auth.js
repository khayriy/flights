const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign Up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    //if the email exist
    if (existing) return res.status(400).json({ msg: "Email already exists" });
    //if not hashed the pass

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ msg: "User Registered" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

//Log In
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the user exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    //check if the password is the same
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Fix the user object structure
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
