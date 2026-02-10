const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0
    },
    version: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);