// models/db.js
const Datastore = require('nedb');
const path = require('path');

const usersDB = new Datastore({ filename: path.join(__dirname, '../data/users.db'), autoload: true });
const coursesDB = new Datastore({ filename: path.join(__dirname, '../data/courses.db'), autoload: true });
const bookingsDB = new Datastore({ filename: path.join(__dirname, '../data/bookings.db'), autoload: true });

// Ensure unique emails
usersDB.ensureIndex({ fieldName: 'email', unique: true }, (err) => {
  if (err) console.error('Index error:', err);
});

module.exports = {
  usersDB,
  coursesDB,
  bookingsDB
};
