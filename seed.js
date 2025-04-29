const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('./models/users');
const Course = require('./models/courses');
const Booking = require('./models/bookings');

if (!fs.existsSync('./data')) fs.mkdirSync('./data');
['users.db~', 'courses.db~', 'bookings.db~'].forEach(file => {
  const path = `./data/${file}`;
  if (fs.existsSync(path)) fs.unlinkSync(path);
});

const seed = async () => {
  console.log('🌱 Seeding database...');

  User.remove({}, { multi: true }, () => {});
  Course.remove({}, { multi: true }, () => {});
  Booking.remove({}, { multi: true }, () => {});

  const hash = await bcrypt.hash('QA', 10);
  User.insert({
    name: 'Admin',
    email: 'admin@dancevibe.com',
    password: hash,
    role: 'admin',
    settings: { theme: 'light', fontSize: 'normal', contrast: false }
  });

  const courses = [
    {
      name: 'Hip Hop Basics',
      instructor: 'Jane',
      time: 'Tuesdays 6PM',
      location: 'Studio A',
      level: 'Beginner',
      sessionCount: 6
    },
    {
      name: 'Salsa Weekend',
      instructor: 'Carlos',
      time: 'Sat & Sun',
      location: 'Hall B',
      level: 'All Levels',
      sessionCount: 2
    }
  ];

  Course.insert(courses, (err, docs) => {
    if (err) return console.error('Course error:', err);
    Booking.insert([
      { courseId: docs[0]._id, name: 'Alice', email: 'alice@example.com' },
      { courseId: docs[1]._id, name: 'Bob', email: 'bob@example.com' }
    ], () => console.log('✅ Bookings added'));
  });

  setTimeout(() => {
    console.log('✅ Seeding complete.');
    process.exit(0);
  }, 1500);
};

seed();
