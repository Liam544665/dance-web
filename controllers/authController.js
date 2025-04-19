const User = require('../models/users');
const bcrypt = require('bcrypt');

exports.showLogin = (req, res) => {
  const message = req.query.error ? 'Invalid email or password.' : null;
  res.render('login', { title: 'Login', message });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log('User not found or error:', err);
      return res.redirect('/auth/login?error=1');
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        console.log('Password mismatch for user:', email);
        return res.redirect('/auth/login?error=1');
      }

      req.session.user = user;
      console.log('Login successful:', user.email);
      res.redirect(user.isAdmin ? '/admin' : '/');
    });
  });
};

exports.showRegister = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Error registering user');

    User.insert({ name, email, password: hash, isAdmin: false }, (err) => {
      if (err) return res.status(500).send('User already exists');
      res.redirect('/auth/login');
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};