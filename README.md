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

graph TD

    37599["User<br>External Actor"]
    subgraph 37597["Database Container"]
        37608["NeDB Datastore<br>NeDB"]
    end
    subgraph 37598["Dance Web Application Container"]
        37600["Web Server<br>Node.js/Express"]
        37601["Routing<br>Express Router"]
        37602["Authentication<br>Node.js/bcrypt"]
        37603["Controllers<br>Node.js"]
        37604["Templating Engine<br>Mustache"]
        37605["Data Models<br>Node.js/NeDB"]
        37606["Configuration<br>JavaScript"]
        37607["Database Seeding<br>Node.js/bcrypt"]
        %% Edges at this level (grouped by source)
        37601["Routing<br>Express Router"] -->|Uses Middleware| 37602["Authentication<br>Node.js/bcrypt"]
    end
    %% Edges at this level (grouped by source)
    37599["User<br>External Actor"] -->|Interacts via HTTP| 37600["Web Server<br>Node.js/Express"]
    37605["Data Models<br>Node.js/NeDB"] -->|Reads/Writes| 37608["NeDB Datastore<br>NeDB"]
    37607["Database Seeding<br>Node.js/bcrypt"] -->|Writes Initial Data To| 37608["NeDB Datastore<br>NeDB"]


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
Password: admin123
```

---

© 2025 DanceVibe – For coursework submission use only.
