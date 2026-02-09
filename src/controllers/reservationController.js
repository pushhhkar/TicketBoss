const {
  reserveSeats,
  cancelSeats,
  getSummary
} = require("../services/reservationService");

exports.createReservation = async (req, res) => {
  try {
    const { partnerId, seats } = req.body;

    if (!partnerId || !seats) {
      return res.status(400).json({
        error: "partnerId and seats required"
      });
    }

    const result = await reserveSeats(partnerId, seats);

    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    await cancelSeats(reservationId);
    res.status(200).json({ message: "Reservation cancelled" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getEventSummary = async (req, res) => {
  try {
    const data = await getSummary();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

