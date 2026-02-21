# 🚀 Expert Session Booking System

A Full-Stack Expert Session Booking System built using:

- React (Vite)
- Node.js
- Express.js
- MongoDB
- Mongoose

This application allows users to browse experts, book sessions, and automatically track booking status.

---

# 📌 Project Overview

The Expert Session Booking System enables users to:

✔ View list of experts  
✔ Search and filter experts  
✔ View dynamic next 7 days time slots  
✔ Book a session  
✔ Prevent double booking  
✔ Auto-update booking status  

---

# 🛠 Tech Stack

## Frontend
- React (Vite)
- React Router DOM
- Axios
- Custom CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# 📂 Folder Structure
expert-booking-system/
│
├── backend/
│ ├── models/
│ │ ├── Booking.js
│ │ └── Expert.js
│ │
│ ├── routes/
│ │ ├── bookingRoutes.js
│ │ └── expertRoutes.js
│ │
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.jsx
│ │ └── index.css
│ │
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

# ⚙ Environment Setup

## 1️⃣ Clone Repository


git clone <your-repo-link>
cd expert-booking-system


---

# 🚀 Backend Setup


cd backend
npm install


Create `.env` file inside backend:


MONGO_URI=your_mongodb_connection_string
PORT=5000


Start backend:


npm run dev


Backend runs at:

http://localhost:5000


---

# 🌐 Frontend Setup

Open new terminal:


cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173


---

# 📡 Backend API Endpoints

### GET /experts
Supports:
- Pagination
- Search
- Category filter

---

### GET /experts/:id
Get single expert details

---

### POST /bookings
Create new booking

Double booking prevented using MongoDB compound index:


{ expert: 1, date: 1, timeSlot: 1 }


---

### GET /bookings?email=
Fetch bookings by email

---

### GET /bookings/expert/:id
Fetch bookings by expert

---

# 🔄 Booking Status Logic

Status updates automatically:

- 🟡 Pending → Immediately after booking
- 🟢 Confirmed → After 5 seconds
- 🔵 Completed → After session time passes

No admin panel required.

---

# 🧠 System Highlights

✔ Dynamic 7-day slot generation  
✔ Category-wise slot timing  
✔ Expired slot detection  
✔ Booked slot disable  
✔ Prevent race condition  
✔ Proper error handling  
✔ Clean folder structure  

---

# 🧪 Build Production Version

Frontend:


cd frontend
npm run build


Backend runs normally on Node server.

---

# 🌍 Deployment

Frontend → Vercel  
Backend → Render  

---

# 👩‍💻 Developed By

Pranavi Alapati  