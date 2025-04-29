const express = require('express');
const router = express.Router();

// Dummy list for now
const sampleCourses = [
  { name: 'Hip Hop 101', instructor: 'Jane Doe', time: 'Tue 6-7pm' },
  { name: 'Salsa Basics', instructor: 'Carlos R.', time: 'Sat 5-6pm' }
];

router.get('/', (req, res) => {
  const courseHTML = sampleCourses.map(course => `
    <div class="course-card">
      <h3>${course.name}</h3>
      <p><strong>Instructor:</strong> ${course.instructor}</p>
      <p><strong>Time:</strong> ${course.time}</p>
    </div>
  `).join('');

  res.render('layout', {
    title: 'Courses',
    user: req.session.user,
    body: `<h2>Available Courses</h2>${courseHTML}`
  });
});

module.exports = router;