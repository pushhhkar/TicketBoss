const express = require("express");
const router = express.Router();

const {
  createReservation,
  cancelReservation,
  getEventSummary
} = require("../controllers/reservationController");
const validateReservation =require("../middleware/validateReservation");

router.post("/", validateReservation, createReservation);
router.delete("/:reservationId", cancelReservation);
router.get("/", getEventSummary);

module.exports = router;
