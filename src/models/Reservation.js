const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reservationId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    partnerId: {
      type: String,
      required: true
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);