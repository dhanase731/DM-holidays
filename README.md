# DM Holidays – Full Stack Setup

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

---

## 1. Start MongoDB
Make sure MongoDB is running on your machine:
```
mongod
```
Or update `server/.env` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dmholidays
```

---

## 2. Start the Backend (Express + MongoDB)
```
cd server
npm run dev
```
Runs on: http://localhost:5000

---

## 3. Start the Frontend (React + Vite)
In a new terminal from the project root:
```
npm run dev
```
Runs on: http://localhost:5173

---

## Admin Panel
Visit: http://localhost:5173/admin
Password: `dmholidays2024`  (change in server/.env → ADMIN_PASSWORD)

---

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/enquiry | Submit enquiry form |
| POST | /api/contact | Submit contact form |
| POST | /api/booking | Submit booking form |
| POST | /api/admin/login | Admin login |
| GET  | /api/admin/data?password= | Get all submissions |
| PATCH | /api/admin/:collection/:id | Update status |
| DELETE | /api/admin/:collection/:id | Delete record |

## Collections in MongoDB
- `enquiries` — from /enquiry page
- `contacts`  — from /contact page  
- `bookings`  — from /booking page

## Offline Fallback
If the backend is not running, forms still save to localStorage/sessionStorage.
The admin panel shows a warning and falls back to localStorage data.
