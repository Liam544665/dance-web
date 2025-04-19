const fs = require('fs');
const Datastore = require('nedb');

const cleanup = (file) => {
  const temp = `${file}~`;
  if (fs.existsSync(temp)) {
    console.warn(`Cleaning up ${temp}`);
    fs.unlinkSync(temp);
  }
};

const loadDB = (filename) => {
  cleanup(filename);
  return new Datastore({ filename, autoload: true, timestampData: true });
};

module.exports = {
  usersDB: loadDB('./data/users.db'),
  coursesDB: loadDB('./data/courses.db'),
  bookingsDB: loadDB('./data/bookings.db'),
};
