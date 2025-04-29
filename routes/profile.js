// routes/profile.js
const express = require('express');
const router = express.Router();
const { usersDB } = require('../models/db');
const renderWithLayout = require('../middleware/renderWithLayout');

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  renderWithLayout('profile', {
    title: 'Your Profile',
    user: req.session.user
  }, req, res);
});

router.post('/update', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const { name, email } = req.body;

  usersDB.update({ _id: req.session.user._id }, { $set: { name, email } }, {}, (err) => {
    if (!err) {
      req.session.user.name = name;
      req.session.user.email = email;
    }
    res.redirect('/profile');
  });
});

module.exports = router;
