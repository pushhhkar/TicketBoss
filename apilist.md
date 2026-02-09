# TicketBoss API List

## Base URL
http://localhost:3000

## 1. Reserve Seats
POST /reservations

Request:
```json
{
  "partnerId": "abc-corp",
  "seats": 3
}

Response:
```json
{
  "reservationId": "uuid",
  "seats": 3,
  "status": "confirmed"
}

Errors:
seats > 10 or <= 0
not enough seats

## 2. Cancel Reservation

DELETE /reservations/:reservationId

Response:
204 No Content

Errors:

reservation not found

already cancelled


3. Event Summary

GET /reservations

Response:

```json

{
  "eventId": "node-meetup-2025",
  "name": "Node.js Meet-up",
  "totalSeats": 500,
  "availableSeats": 497,
  "reservationCount": 1,
  "version": 2
}

All api tested on postman 