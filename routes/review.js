const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middlewares/authmiddleware");

// Create a new review
router.post("/", auth, async (req, res) => {
  try {
    // Add the user ID from the authenticated request
    const reviewData = {
      ...req.body,
      user: req.user.id, // This comes from the auth middleware
    };

    const review = new Review(reviewData);
    await review.save();

    // Populate the user details before sending the response
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name email"
    );

    res.json(populatedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get reviews for a flight
router.get("/:flightId", async (req, res) => {
  try {
    // Populate the user field to get user details
    const reviews = await Review.find({ flight: req.params.flightId })
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get reviews by user ID
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
