const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('layout', {
    title: 'Welcome',
    user: req.session.user,
    body: `
      <section>
        <h1>Welcome to DanceVibe!</h1>
        <p>Book your dance courses and manage your schedule with ease.</p>
      </section>
    `
  });
});

module.exports = router;