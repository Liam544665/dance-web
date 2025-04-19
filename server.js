const fs = require('fs');
const path = require('path');

const startApp = async () => {
  const dataDir = path.join(__dirname, 'data');
  const tempFiles = ['users.db~', 'courses.db~', 'bookings.db~'];
  const needsDelay = tempFiles.some(f => fs.existsSync(path.join(dataDir, f)));

  if (needsDelay) {
    console.log('🛑 NeDB temp files found. Waiting 1.5 seconds before starting...');
    await new Promise(resolve => setTimeout(resolve, 1500));
  } else {
    console.log('🕒 No temp files found. Starting immediately...');
  }

  const express = require('express');
  const mustacheExpress = require('mustache-express');
  const session = require('express-session');
  const app = express();
  const PORT = 3000;

  // VIEW ENGINE SETUP
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', path.join(__dirname, 'views'));

  // MIDDLEWARE
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: false
    })
  );

  // ✅ Inject session user and settings into all views
  app.use((req, res, next) => {
    const settings = req.session.settings || {
      theme: 'light',
      fontSize: 'normal',
      contrast: false
    };

    res.locals.user = req.session.user;
    res.locals.settings = {
      dark: settings.theme === 'dark',
      light: settings.theme === 'light',
      largeFont: settings.fontSize === 'large',
      normalFont: settings.fontSize === 'normal',
      contrast: settings.contrast
    };

    next();
  });

  // ROUTES
  app.use('/', require('./routes/index'));
  app.use('/auth', require('./routes/auth'));
  app.use('/courses', require('./routes/courses'));
  app.use('/profile', require('./routes/profile'));
  app.use('/settings', require('./routes/settings'));
  app.use('/admin', require('./routes/admin'));
  app.use('/booking', require('./routes/bookings'));

  // 404 fallback
  app.use((req, res) => {
    res.status(404).render('404');
  });

  // START SERVER
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};

startApp();
