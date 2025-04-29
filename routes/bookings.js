const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  res.render('layout', {
    title: 'My Bookings',
    user: req.session.user,
    body: `
      <h2>My Bookings</h2>
      <p>This is where your dance class bookings will appear.</p>
    `
  });
});

module.exports = router;