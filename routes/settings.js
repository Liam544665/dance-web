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

const renderWithLayout = require('../middleware/renderWithLayout');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  const settings = req.session.settings || { theme: 'light', fontSize: 'normal', contrast: false };
  renderWithLayout('settings', {
    title: 'Settings',
    settings: {
      light: settings.theme === 'light',
      dark: settings.theme === 'dark',
      normal: settings.fontSize === 'normal',
      large: settings.fontSize === 'large',
      contrast: settings.contrast
    }
  }, req, res);
});

router.post('/', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const newSettings = {
    theme: req.body.theme || 'light',
    fontSize: req.body.fontSize || 'normal',
    contrast: req.body.contrast === 'on'
  };

  req.session.settings = newSettings;

  User.update({ _id: req.session.user._id }, { $set: { settings: newSettings } }, {}, (err) => {
    if (err) console.error('Failed to update user settings in DB:', err);
    res.redirect('/settings');
  });
});

router.post('/reset', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const defaultSettings = { theme: 'light', fontSize: 'normal', contrast: false };
  req.session.settings = defaultSettings;

  User.update({ _id: req.session.user._id }, { $set: { settings: defaultSettings } }, {}, (err) => {
    if (err) console.error('Failed to reset settings in DB:', err);
    res.redirect('/settings');
  });
});

module.exports = router;
