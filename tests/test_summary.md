# Test Summary Report

## ✅ Overview
This test suite covers core functionality of the DanceVibe web application, using Jest and Supertest for integration-level checks.

## 🧪 Test Files

### 1. `auth.test.js`
- Loads login page (`GET /auth/login`)
- Fails login with invalid credentials (`POST /auth/login`)

### 2. `courses.test.js`
- Loads all courses (`GET /courses`)

### 3. `profile.test.js`
- Redirects to login if unauthenticated (`GET /profile`)

### 4. `bookings.test.js`
- Redirects to login if unauthenticated for booking (`GET /booking/new/:courseId`)

## 🔧 How to Run
```bash
npm install
npm test
```

## 🗂 Directory
All test files are located in `/tests`.

## 📌 Notes
- Tests are non-destructive (read-only)
- Login-related tests can be expanded to simulate full auth flow with sessions in future
