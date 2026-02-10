require("dotenv").config();

const express = require("express");

const connectDB = require("./config/database");
const reservationRoutes = require("./routes/reservationRoutes");
const errorHandler = require("./middleware/errorHandler");
const seedEvent = require("./utils/seedEvent");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server working" });
});

app.use("/reservations", reservationRoutes);

app.use(errorHandler);


connectDB()
  .then(async () => {
    await seedEvent();

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

module.exports = app;
