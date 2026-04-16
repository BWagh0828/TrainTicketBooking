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

## 📬 Postman Collection

You can access and test all APIs using the Postman collection link below:

🔗 **Postman Collection URL:**
https://bhupendra0828-wagh-4867799.postman.co/workspace/My-Workspace~ccda94a9-3ec5-4679-bcf5-f803a7579e03/collection/53598363-bd6049f0-5226-421e-99e9-f3936b2ee86e?action=share&source=copy-link&creator=54065830

---

### 📥 How to Use

1. Open Postman
2. Click **Import**
3. Select **Link** tab
4. Paste the above URL
5. Click **Continue → Import**

---

### ⚙️ Set Environment Variable

Create an environment in Postman:

```text
base_url = http://localhost:3000
```

---

### 🚀 Available APIs in Collection

* 🔐 Register User
* 🔐 Login User
* 🎟️ Book Ticket
* 📄 View Bookings
* ❌ Cancel Ticket
* 👁️ View Cancel Ticket
* 👁️ View History 
* 🗑️ Delete Ticket 

---

### 📌 Notes

* Make sure your server is running before testing APIs
* Update `base_url` if your port is different
* Use valid request body data


---

## 📊 ER Diagram

<img width="1232" height="833" alt="image" src="https://github.com/user-attachments/assets/cbcb661c-8dcc-46ac-9bd2-c7611973d105" />


---

## 🏗️ Architecture Diagram

<img width="1089" height="1181" alt="image" src="https://github.com/user-attachments/assets/757690db-b3ce-4c2d-bbfc-3cecee49babd" />


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
