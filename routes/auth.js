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

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const renderWithLayout = require('../middleware/renderWithLayout');

router.get('/login', (req, res) => {
  renderWithLayout('login', { title: 'Login' }, req, res);
});

router.post('/login', authController.login);

router.get('/register', (req, res) => {
  renderWithLayout('register', { title: 'Register' }, req, res);
});

router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
