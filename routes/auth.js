const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('layout', {
    title: 'Login',
    body: `
      <h2>Login</h2>
      <form action="/auth/login" method="POST">
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
    `
  });
});

router.get('/register', (req, res) => {
  res.render('layout', {
    title: 'Register',
    body: `
      <h2>Register</h2>
      <form action="/auth/register" method="POST">
        <input type="text" name="name" placeholder="Name" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Register</button>
      </form>
    `
  });
});

module.exports = router;