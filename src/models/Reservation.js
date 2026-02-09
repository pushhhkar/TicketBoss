const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    reservationId: {
        type: String,
        required: true,
        unique: true
    },
    partnerId: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "confirmed"
    }
},
{   timestamps: true}
);

module.exports = mongoose.model("Reservation", reservationSchema);