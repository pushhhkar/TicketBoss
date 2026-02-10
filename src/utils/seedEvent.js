const Event = require("../models/Event");

const EVENT_ID = "node-meetup-2025";

const seedEvent = async () => {
  try {
    const existingEvent = await Event.findOne({ eventId: EVENT_ID });

    if (!existingEvent) {
      await Event.create({
        eventId: EVENT_ID,
        name: "Node.js Meet-up",
        totalSeats: 500,
        availableSeats: 500,
        version: 0
      });

      console.log("Event seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding event:", err);
  }
};

module.exports = seedEvent;

