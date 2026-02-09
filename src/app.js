require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const reservationRoutes = require("./routes/reservationRoutes");
const seedEvent = require("./utils/seedEvent");
const app = express();
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

connectDB().then(() => {
  seedEvent();
});


app.get("/", (req, res) => {
  res.send("Server working");
});

app.use("/reservations", reservationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

