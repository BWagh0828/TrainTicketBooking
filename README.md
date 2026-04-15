🚆 Train Ticket Booking System (Node.js + SQL Server + Redis)

A scalable backend system for booking train tickets with features like authentication, seat management, waiting list, caching, and admin controls.

📌 Features
🔐 JWT Authentication (User & Admin)
🎫 Train-based ticket booking
🪑 Auto seat allocation (no manual input)
🎟️ TicketNo = SeatNo
🧾 PNR generation
⏳ Waiting list (max 2 users)
🔄 Auto seat release on cancel/delete
⚡ Redis caching for performance
🛡️ Rate limiting (login & booking)
⏰ Cron job for booking expiry
👨‍💼 Admin APIs
🏗️ Tech Stack
Backend: Node.js, Express.js
Database: SQL Server
Cache: Redis
Auth: JWT
ORM: mssql (msnodesqlv8)
📂 Project Structure
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── cron/
 └── app.js
⚙️ Installation
1. Clone Repo
git clone https://github.com/your-username/train-ticket-booking.git
cd train-ticket-booking
2. Install Dependencies
npm install
3. Setup Environment

Create .env file:

PORT=3000
JWT_SECRET=your_secret_key
4. Start Server
npm start
🗄️ Database Setup
Install SQL Server
Create DB: TrainDB
Run all stored procedures
Create required tables:
Users
UserDetails
Booking
TrainDetails
🧠 System Architecture
Client (Postman)
      ↓
Routes (Express)
      ↓
Middleware (JWT, Role, Rate Limit)
      ↓
Controllers
      ↓
Services
      ↓
Stored Procedures (SQL Server)
      ↓
Database Tables
      ↓
Redis Cache
🧾 ER Diagram
Users
 ├── Id (PK)
 ├── Name
 ├── Role

UserDetails
 ├── Id (FK)
 ├── Email
 ├── Password

Booking
 ├── Bid (PK)
 ├── Id (FK → Users)
 ├── TicketNo
 ├── TrainNumber
 ├── FromPlace
 ├── ToPlace
 ├── TicketPrice
 ├── FromDate
 ├── ToDate
 ├── SeatNo
 ├── Status (CONFIRMED / WAITING / CANCELLED)
 ├── PNR
 ├── CreatedAt

TrainDetails
 ├── Id (PK)
 ├── TrainName
 ├── TrainNumber
 ├── BogiNumber (B1, B2)
 ├── SeatNumber (T1–T10)
 ├── Status (AVAILABLE / BOOKED)
 ├── PNR
🔄 Booking Flow
User sends booking request with:
Train Number
Journey details
System:
Finds available seat
Assigns seat automatically
Generates TicketNo & PNR
Saves booking
If full:
Adds to waiting list (max 2)
On cancel:
Seat becomes available
Waiting user gets seat automatically
📮 API Endpoints
🔐 Auth APIs
Register
POST /api/auth/register
Login
POST /api/auth/login
🎫 Booking APIs
Create Booking
POST /api/bookings
{
  "trainNumber": "T123",
  "from": "Indore",
  "to": "Mumbai",
  "price": 500,
  "fromDate": "2026-04-20",
  "toDate": "2026-04-21",
  "phone": "9876543210"
}
Get Bookings
GET /api/bookings
Cancel Booking
PUT /api/bookings/cancel/:id
Delete Booking
DELETE /api/bookings/delete/:id
Cancelled Tickets
GET /api/bookings/cancelled
Booking History
GET /api/bookings/history
👨‍💼 Admin API
Get All Bookings
GET /api/admin/bookings
🧪 Demo Scenario
Book 10 tickets → Train FULL
Book 11th → WAITING
Cancel 1 ticket → Seat AVAILABLE
Waiting user gets seat automatically
⚡ Performance Optimization
Redis caching for bookings
SQL stored procedures
Rate limiting
Indexed queries
🔒 Security
JWT authentication
Role-based access (Admin/User)
Rate limiting
Input validation
🚀 Future Enhancements
🎨 React UI (seat layout)
💳 Payment integration
📱 Mobile app
📄 Ticket PDF download
🔔 Notifications (Email/SMS)
🔐 Seat locking (real-time)
👨‍💻 Author

Bhupendra Wagh
