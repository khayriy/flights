const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const auth = require("../middlewares/authmiddleware");

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ departureDate: 1 });
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Add a search endpoint
router.get("/search", async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      const flights = await Flight.find().sort({ departureDate: 1 });
      return res.json(flights);
    }

    // Convert term to string and number for different field types
    const numericTerm = !isNaN(term) ? Number(term) : null;

    // Build search query
    const searchQuery = {
      $or: [
        { airline: { $regex: term, $options: "i" } },
        { from: { $regex: term, $options: "i" } },
        { to: { $regex: term, $options: "i" } },
      ],
    };

    // Add flightNumber condition only if term is numeric
    if (numericTerm !== null) {
      searchQuery.$or.push({ flightNumber: numericTerm });
    }

    const flights = await Flight.find(searchQuery).sort({ departureDate: 1 });
    res.json(flights);
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Reserve a flight
router.post("/reserve", auth, async (req, res) => {
  try {
    const { flightId } = req.body;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ msg: "Flight not found" });
    }

    // In a real app, you would create a reservation record
    // For now, just return the flight
    res.json(flight);
  } catch (error) {
    console.error("Error reserving flight:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
