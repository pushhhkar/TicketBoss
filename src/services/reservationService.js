const { v4: uuidv4 } = require("uuid");
const Event = require("../models/Event");
const Reservation = require("../models/Reservation");

exports.reserveSeats = async (partnerId, seats) => {
  try {
    if (!partnerId || seats <= 0 || seats > 10) {
      throw new Error("Invalid seat request");
    }

    const updatedEvent = await Event.findOneAndUpdate(
      {
        eventId: "node-meetup-2025",
        availableSeats: { $gte: seats }
      },
      {
        $inc: {
          availableSeats: -seats,
          version: 1
        }
      },
      { new: true }
    );

    if (!updatedEvent) {
      throw new Error("Not enough seats left");
    }

    const reservation = await Reservation.create({
      reservationId: uuidv4(),
      partnerId,
      seats,
      status: "confirmed"
    });

    return {
      reservationId: reservation.reservationId,
      seats,
      status: "confirmed"
    };

  } catch (err) {
    throw new Error(err.message);
  }
};



exports.cancelSeats = async (reservationId) => {
  try {
    const reservation = await Reservation.findOne({ reservationId });
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    if (reservation.status === "cancelled") {
      throw new Error("Reservation already cancelled");
    }
    const event = await Event.findOneAndUpdate(
      { eventId: "node-meetup-2025" },
      { $inc: { availableSeats: reservation.seats } },
      { new: true }
    );
    if (!event) {
      throw new Error("Event not found");
    }
    reservation.status = "cancelled";
    await reservation.save();
  } catch (err) {
    throw err;
  }
};



exports.getSummary = async () => {
  try {
    const event = await Event.findOne({
      eventId: "node-meetup-2025"
    });

    if (!event) {
      throw new Error("Event not found");
    }

    const reservationCount = await Reservation.countDocuments({
      status: "confirmed"
    });

    return {
      eventId: event.eventId,
      name: event.name,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
      reservationCount,
      version: event.version
    };

  } catch (err) {
    throw err;
  }
};


