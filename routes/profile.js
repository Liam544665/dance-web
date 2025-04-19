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

cleanupCorrupt('./data/users.db');

// routes/profile.js
const express = require('express');
const router = express.Router();
const renderWithLayout = require('../middleware/renderWithLayout');

const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const { name, email } = req.session.user;
  renderWithLayout('profile', {
    title: 'Your Profile',
    name,
    email
  }, req, res);
});

router.post('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const { name, email, password } = req.body;
  const userId = req.session.user._id;

  const updateFields = { name, email };

  if (password && password.trim() !== '') {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    } catch (err) {
      console.error('Password hashing error:', err);
      return res.status(500).send('Server error');
    }
  }

  usersDB.update({ _id: userId }, { $set: updateFields }, {}, (err, numReplaced) => {
    if (err) {
      console.error('Failed to update user:', err);
      return res.status(500).send('Database error');
    }

    // Update session
    req.session.user.name = name;
    req.session.user.email = email;

    res.redirect('/profile');
  });
});

module.exports = router;
