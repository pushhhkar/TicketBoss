const validateReservation = (req, res, next) => {
  const { partnerId, seats } = req.body;

  if (!partnerId) {
    return res.status(400).json({
      error: "partnerId is required"
    });
  }

  if (typeof seats !== "number" || seats <= 0 || seats > 10) {
    return res.status(400).json({
      error: "seats must be a number between 1 and 10"
    });
  }

  next();
};

module.exports = validateReservation;

