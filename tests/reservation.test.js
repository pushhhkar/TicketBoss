const request = require("supertest");
const app = require("../src/app");

describe("Reservation API", () => {

  test("GET /reservations works", async () => {
    const res = await request(app).get("/reservations");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("availableSeats");
  });

  test("POST /reservations creates reservation", async () => {
    const res = await request(app)
      .post("/reservations")
      .send({
        partnerId: "test-user",
        seats: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("reservationId");
  });

});

const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});
