const { usersDB, coursesDB, bookingsDB } = require('../db');
const fs = require('fs');
const Datastore = require('nedb');

const cleanupCorrupt = (path) => {
  const tempPath = `${path}~`;
  if (fs.existsSync(tempPath)) {
    console.warn(`⚠️ Cleaning up leftover NeDB temp file: ${tempPath}`);
    fs.unlinkSync(tempPath);
  }
};

cleanupCorrupt('./data/courses.db');
cleanupCorrupt('./data/bookings.db');
cleanupCorrupt('./data/users.db');

const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const renderWithLayout = require('../middleware/renderWithLayout');

router.get('/new/:courseId', (req, res) => {
  bookingsController.showBookingForm(req, {
    render: (viewData) => {
      renderWithLayout('booking', { ...viewData, title: 'Book a Course' }, req, res);
    },
    status: (code) => res.status(code)
  });
});

router.post('/create/:courseId', bookingsController.createBooking);

module.exports = router;
