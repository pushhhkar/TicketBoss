const validateReservation = (req, res, next) => {
  try {
    const { partnerId, seats } = req.body;

    if (!partnerId) {
      return res.status(400).json({
        error: "partnerId is required"
      });
    }

    if (!seats || seats <= 0) {
      return res.status(400).json({
        error: "seats must be greater than 0"
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = validateReservation;
