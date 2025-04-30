// server.js
const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const app = express();

// Setup view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'dance-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Expose user to all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/courses', require('./routes/courses'));
app.use('/bookings', require('./routes/bookings'));
app.use('/profile', require('./routes/profile'));
app.use('/admin', require('./routes/admin'));

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎉 Server running on http://localhost:${PORT}`);
});
