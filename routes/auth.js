const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Datastore = require('nedb');
const usersDB = new Datastore({ filename: './data/users.db', autoload: true });

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

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  usersDB.findOne({ email }, (err, user) => {
    if (err || !user) return res.status(401).send('Invalid credentials');
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/profile'); // You can change this to /courses or /
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

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  usersDB.insert({ name, email, password: hashedPassword, isAdmin: false }, (err, newUser) => {
    if (err) return res.status(500).send('Registration failed');
    req.session.user = newUser;
    res.redirect('/profile');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
