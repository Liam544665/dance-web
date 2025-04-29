const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) return res.status(403).send('Admins only');

  res.render('layout', {
    title: 'Admin Dashboard',
    user: req.session.user,
    body: `
      <h2>Admin Panel</h2>
      <p>Manage courses, bookings, and users here.</p>
    `
  });
});

module.exports = router;