const Event = require("../models/Event");

const seedEvent = async () => {
  try {
    const existingEvent = await Event.findOne({
      eventId: "node-meetup-2025"
    });

    if (!existingEvent) {
      await Event.create({
        eventId: "node-meetup-2025",
        name: "Node.js Meet-up",
        totalSeats: 500,
        availableSeats: 500,
        version: 0
      });

      console.log("Event seeded");
    }
  } catch (err) {
    console.log("Error seeding event", err.message);
  }
};

module.exports = seedEvent;
