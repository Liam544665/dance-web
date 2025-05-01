# DanceVibe Web Application

A full-stack course booking system for a dance academy built using Node.js, Express, Mustache, and NeDB.

## 🚀 Features

- 🏠 **Homepage** with welcome message
- 📚 **Course listings** with time, level, instructor, and location
- 📝 **Course booking** form for registered users
- 🔐 **Authentication**: Register / Login / Logout
- 👤 **User profile** with editable details & password change
- ⚙️ **Site settings**: theme, contrast, font size
- 🛠 **Admin panel**:
  - Add/Edit/Delete courses
  - View bookings for each course
  - Promote/Demote/Delete users
- 🧪 **Tests** using Jest + Supertest

## 🧑‍💻 Tech Stack

- **Node.js** & **Express**
- **Mustache templates** for UI
- **NeDB** for local database
- **bcrypt** for secure password hashing
- **express-session** for authentication

## 📂 Project Structure

```
├── routes/             # Express route handlers
├── controllers/        # Logic for routes
├── views/              # Mustache templates
├── models/             # NeDB wrappers
├── public/             # Static assets (CSS, images)
├── middleware/         # Auth and layout render helpers
├── data/               # NeDB files
├── tests/              # Jest + Supertest test files
├── seed.js             # Data seeder
└── server.js           # App entry point
```


## 🧪 Testing

Install dev dependencies and run:

```bash
npm install
npm test
```

Includes tests for:
- Auth
- Bookings
- Profile
- Courses

## 📦 Deployment

To run locally:
```bash
node seed.js  # Preload admin + courses
node server.js
```

If deploying to Render or Glitch:
- Use Node.js environment
- Ensure `data/` folder is writable
- Set up a `render.json` if needed (ask if you'd like one!)

## 🔑 Admin Credentials

Use the seeded admin account:
```
Email: admin@dancevibe.com
Password: QA
```

---

© 2025 DanceVibe – For coursework submission use only.
