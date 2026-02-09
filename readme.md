# TicketBoss – Event Reservation API

A Node.js + Express + MongoDB backend service for managing event seat reservations while preventing overselling.

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- UUID for reservation IDs (universally unique id)

---

## Setup Instructions

### 1. Clone or Download Project
git clone <repo-url>
cd ticketboss

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
Create .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string

### 4. Run Application

Development mode:
npm run dev

Production:
npm start

Server runs at:
http://localhost:3000

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
├── README.md
├── apilist.md
├── package.json
├── .env
├── .gitignore
└── node_modules/

---

## API Documentation

Base URL:
http://localhost:3000

### 1. Get Event Summary
Returns event seat info.

Endpoint: GET /reservations

Response Example:
{
  "eventId": "node-meetup-2025",
  "name": "Node.js Meet-up",
  "totalSeats": 500,
  "availableSeats": 495,
  "reservationCount": 5,
  "version": 0
}

### 2. Reserve Seats
Reserve seats for event.

Endpoint: POST /reservations

Headers:
Content-Type: application/json

Request Body:
{
  "partnerId": "pt1",
  "seats": 3
}

Response:
{
  "reservationId": "uuid-value",
  "seats": 3,
  "status": "confirmed"
}

### 3. Cancel Reservation
Cancels reservation and releases seats.

Endpoint: DELETE /reservations/:reservationId

Example:
DELETE /reservations/uuid-value

Response:
204 Reservation cancelled

---

## Architecture
Route → Controller → Service → Database

Benefits:
Clean separation  
Easy scaling  
Easier testing  
Maintainable code  

---

## Database Choice
MongoDB chosen because:
Flexible schema  
Fast development  
Good fit for reservation data  
Easy scaling  

---

## Overselling Prevention
Seats are updated using an atomic DB update.  
Only reserve if availableSeats >= requested seats.  
Prevents two users booking same seats simultaneously.

---

## Reservation ID
UUID used to:
Generate unique reservation IDs  
Avoid predictable IDs  
Ensure distributed uniqueness  

---

## Event Seeding
A default event is automatically inserted if not present when the server starts.

---

## Features Implemented
Seat reservation  
Seat cancellation  
Seat count update  
Overselling prevention  
Event summary endpoint  
Reservation tracking  

---

## Testing
API tested using:
Postman  
MongoDB Compass
