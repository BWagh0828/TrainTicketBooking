# 🚆 Train Ticket Booking System (Node.js + SQL Server)

## 📌 Project Overview

The **Train Ticket Booking System** is a backend application built using **Node.js, Express, and SQL Server**.
It allows users to book train tickets, manage seat availability, handle cancellations, and track completed journeys.

This project simulates a real-world railway reservation system with features like:

* Seat booking (Confirmed / Waiting)
* Ticket cancellation
* Automatic seat reassignment
* Journey completion tracking

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQL Server
* **Tools:** SQL Server Management Studio (SSMS), Postman
* **Version Control:** Git & GitHub

---

## 📂 Project Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd train-ticket-booking
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Server

```bash
npm start
```

---

## 🗄️ Database Setup

### Step 1: Create Database

```sql
CREATE DATABASE TrainDB;
```

### Step 2: Run SQL Script

* Import `database.sql` file (included in root)
* This will create:

  * Tables
  * Stored Procedures
  * Constraints

---

## 🧩 Database Tables

### 👤 Users

Stores basic user information.

* Id (PK)
* Name
* Role

---

### 🔐 UserDetails

Stores login credentials.

* Uid (PK)
* Id (FK → Users)
* Email
* Password
* Phone

---

### 🚆 TrainDetails

Stores seat-level train information.

* Id (PK)
* TrainNumber
* BogiNumber
* SeatNumber
* AvailableSeats
* BookedSeats
* WaitingSeats
* Status

---

### 🎟️ Bookings

Main booking table.

* Bid (PK)
* TicketNo
* FromPlace / ToPlace
* SeatNo
* Status (ACTIVE / CONFIRMED / CANCELLED)

---

### ❌ CancelTicket

Stores cancelled tickets.

* Eid (PK)
* Bid (FK → Bookings)
* Status

---

### ✅ CompletedBooking

Stores completed journeys.

* Pid (PK)
* Bid (FK → Bookings)
* PreviousTicketNo

---

## 🔄 Booking Flow

### ✔ Ticket Booking

1. User selects train & seat
2. System checks availability:

   * If available → **CONFIRMED**
   * Else → **WAITING**
3. TrainDetails updated accordingly

---

### ❌ Ticket Cancellation

1. Ticket moved to **CancelTicket**
2. Seat becomes available
3. Waiting ticket (if any) → moved to **CONFIRMED**

---

### ✅ Journey Completion

1. After journey date:
2. Booking moved to **CompletedBooking**
3. Removed from active bookings

---

## ⚙️ Stored Procedures

Project includes important stored procedures:

* `sp_CreateBooking`
* `sp_CancelBooking`
* `sp_ExpireBookings`
* `sp_GetBookingsByUser`
* `sp_GetBookingById`

---

## 🔗 API Endpoints (Example)

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | /register         | Register user     |
| POST   | /login            | User login        |
| POST   | /book-ticket      | Book ticket       |
| POST   | /cancel-ticket    | Cancel ticket     |
| GET    | /bookings/:userId | Get user bookings |

---

## 📊 ER Diagram

👉 (Add your ER diagram image here)

---

## 🏗️ Architecture Diagram

👉 (Add your architecture diagram here)

---

## 📦 Project Files (Root)

* `README.md`
* `database.sql`
* `PPT.pptx`
* `ER_Diagram.png`
* `Architecture.png`

---

## 🚀 Features Implemented

✔ User Registration & Login
✔ Train Seat Management
✔ Ticket Booking System
✔ Waiting List Logic
✔ Ticket Cancellation
✔ Auto Seat Reassignment
✔ Completed Journey Tracking

---

## ⚠️ Known Issues / Improvements

* Phone number validation pending
* Email uniqueness validation improvement
* UI not implemented (Backend only)

---

## 👨‍💻 Author

**Bhupendra Wagh**

---

## ⭐ How to Run (Quick)

```bash
git clone <repo>
npm install
npm start
```

---

## 📌 Notes

* Make sure SQL Server is running
* Update DB connection string in config file
* Use Postman to test APIs

---

## 🎯 Conclusion

This project demonstrates a complete backend system for train ticket booking with real-world scenarios like waiting list, cancellation, and journey completion.

---
