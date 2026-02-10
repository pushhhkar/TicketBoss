const { v4: uuidv4 } = require("uuid");
const Event = require("../models/Event");
const Reservation = require("../models/Reservation");

const EVENT_ID = "node-meetup-2025";

exports.reserveSeats = async (partnerId, seats) => {
  if (!partnerId || typeof seats !== "number" || seats <= 0 || seats > 10) {
    throw new Error("Invalid seat request");
  }

  const updatedEvent = await Event.findOneAndUpdate(
    {
      eventId: EVENT_ID,
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
};

exports.cancelSeats = async (reservationId) => {
  if (!reservationId) {
    throw new Error("Reservation ID required");
  }

  const reservation = await Reservation.findOne({ reservationId });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.status === "cancelled") {
    throw new Error("Reservation already cancelled");
  }

  const event = await Event.findOneAndUpdate(
    { eventId: EVENT_ID },
    { $inc: { availableSeats: reservation.seats } },
    { new: true }
  );

  if (!event) {
    throw new Error("Event not found");
  }

  reservation.status = "cancelled";
  await reservation.save();
};

exports.getSummary = async () => {
  const event = await Event.findOne({ eventId: EVENT_ID });

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
};



