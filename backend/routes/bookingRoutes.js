const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create Booking
router.post("/", async (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    if (!expertId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const booking = new Booking({
      expert: expertId,
      name,
      email,
      phone,
      date: new Date(date), // ✅ force proper Date
      timeSlot,
      notes
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    console.error("BOOKING ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get bookings by expert
router.get("/expert/:id", async (req, res) => {
  try {
    const bookings = await Booking.find({
      expert: req.params.id
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get bookings by email
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bookings = await Booking.find({ email }).populate("expert");

    res.json(bookings);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;