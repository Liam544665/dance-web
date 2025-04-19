const bcrypt = require('bcrypt');
const User = require('./models/users');
const Course = require('./models/courses');
const Booking = require('./models/bookings');

const seed = async () => {
  // Clear existing data
  User.remove({}, { multi: true }, () => {});
  Course.remove({}, { multi: true }, () => {});
  Booking.remove({}, { multi: true }, () => {});

  // Create an admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  User.insert({
    name: 'Admin User',
    email: 'admin@dancevibe.com',
    password: passwordHash,
    isAdmin: true,
    role: 'admin',
    settings: {
      theme: 'light',
      fontSize: 'normal',
      contrast: false
    }
  });

  // Sample courses
  const courses = [
    {
      name: 'Beginner Hip Hop',
      level: 'Beginner',
      instructor: 'Jane Doe',
      time: 'Tuesdays 6-7pm',
      location: 'Studio A',
      sessionCount: 6
    },
    {
      name: 'Salsa Workshop Weekend',
      level: 'All Levels',
      instructor: 'Carlos Rivera',
      time: 'March 16-17',
      location: 'Community Hall',
      sessionCount: 5
    }
  ];

  Course.insert(courses, (err, docs) => {
    if (err) console.error('Course seeding failed:', err);
    else console.log('Courses added:', docs);
  });

  // Optional: seed sample bookings
  Booking.insert([
    {
      courseId: '1', // replace with actual _id if known
      name: 'Sample User 1',
      email: 'user1@example.com'
    },
    {
      courseId: '2',
      name: 'Sample User 2',
      email: 'user2@example.com'
    }
  ], (err) => {
    if (err) console.error('Booking seeding failed:', err);
    else console.log('Sample bookings added.');
  });

  // Give NeDB time to flush to disk
  setTimeout(() => {
    console.log('✅ Seeding complete. You can now start the server.');
    process.exit(0);
  }, 1000);
};

seed();
