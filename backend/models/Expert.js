const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: String,
  slots: [String]
});

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4
  },
  availableSlots: [slotSchema]
});

module.exports = mongoose.model("Expert", expertSchema);