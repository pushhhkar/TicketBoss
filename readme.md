# TicketBoss – Event Reservation API

A Node.js + Express + MongoDB backend service for managing event seat reservations while preventing overselling.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- UUID for reservation IDs
- Jest & Supertest for automated API testing

---

## Setup Instructions

### 1. Clone or Download Project

git clone <repo-url>
cd ticketboss

### 2. Install Dependencies

npm install

### 3. Configure Environment Variables

Create a `.env` file in project root:

PORT=3000
MONGO_URI=your_mongodb_connection_string

### 4. Run Application

Development mode:

npm run dev

Production mode:

npm start

Server runs at:

http://localhost:3000

---

## Running Tests

Run automated API tests:

npm test

Tests verify:
- Event summary endpoint
- Reservation creation flow

---

## Project Structure

ticketboss/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── reservationController.js
│   │
│   ├── middleware/
│   │   ├── validateReservation.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── Event.js
│   │   └── Reservation.js
│   │
│   ├── routes/
│   │   └── reservationRoutes.js
│   │
│   ├── services/
│   │   └── reservationService.js
│   │
│   ├── utils/
│   │   └── seedEvent.js
│   │
│   └── app.js
│
├── tests/
│   └── reservation.test.js
│
├── README.md
├── apilist.md
├── package.json
├── .gitignore
└── node_modules/

---

## API Documentation

Base URL:

http://localhost:3000

---

### 1. Get Event Summary

Returns event seat information.

Endpoint:

GET /reservations

Example Response:

{
  "eventId": "node-meetup-2025",
  "name": "Node.js Meet-up",
  "totalSeats": 500,
  "availableSeats": 495,
  "reservationCount": 5,
  "version": 0
}

---

### 2. Reserve Seats

Reserves seats for an event.

Endpoint:

POST /reservations

Headers:

Content-Type: application/json

Request Body:

{
  "partnerId": "pt1",
  "seats": 3
}

Example Response:

{
  "reservationId": "uuid-value",
  "seats": 3,
  "status": "confirmed"
}

---

### 3. Cancel Reservation

Cancels reservation and releases seats.

Endpoint:

DELETE /reservations/:reservationId

Example:

DELETE /reservations/uuid-value

Example Response:

{
  "message": "Reservation cancelled"
}

---

## Architecture

Request Flow:

Route → Controller → Service → Database

Benefits:
- Clean separation of concerns
- Easier scaling
- Easier testing
- Maintainable structure

---

## Database Choice

MongoDB chosen because:
- Flexible schema
- Faster development cycle
- Good fit for reservation data
- Easy horizontal scaling

---

## Overselling Prevention

Seat updates use atomic database operations.

Reservation is allowed only if:

availableSeats >= requested seats

This prevents concurrent booking conflicts.

---

## Reservation ID Strategy

UUID is used to:
- Generate globally unique reservation IDs
- Avoid predictable incremental IDs
- Support distributed systems safely

---

## Event Seeding

A default event is automatically inserted when the server starts if not already present.

---

## Assumptions Made

The following assumptions were made while implementing the API based on the assignment requirements:

1. Only one active event exists at a time, as the problem statement seeds a single event during startup.

2. Maximum seats per reservation request are limited to 10, as specified in requirements.

3. Reservation requests must receive an immediate success or failure response; no waitlist or queue system is implemented.

4. Seats are returned to the pool immediately when a reservation is cancelled.

5. Reservation IDs are globally unique using UUID to avoid collisions.

6. Reservation once cancelled cannot be cancelled again.

7. Reservation status can only be either:
   - confirmed
   - cancelled

8. Event data is seeded only once on first startup and reused thereafter.

---

## Features Implemented

- Seat reservation
- Reservation cancellation
- Seat availability tracking
- Overselling prevention
- Event summary endpoint
- Reservation tracking
- Automated API tests

---

## Testing Tools Used

- Postman for manual testing
- MongoDB Compass for database inspection
- Jest & Supertest for automated API testing
