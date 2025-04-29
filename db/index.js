const Datastore = require('nedb');
const fs = require('fs');
const path = require('path');

const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const createDB = (filename) => {
  ensureDir(filename);
  const db = new Datastore({ filename, autoload: true });
  const tempFile = filename + '~';
  if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  return db;
};

module.exports = {
  usersDB: createDB('./data/users.db'),
  coursesDB: createDB('./data/courses.db'),
  bookingsDB: createDB('./data/bookings.db')
};
