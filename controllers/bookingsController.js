const Booking = require('../models/bookings');
const Course = require('../models/courses');

exports.showBookingForm = (req, resOrContext) => {
  const courseId = req.params.courseId;
  Course.findOne({ _id: courseId }, (err, course) => {
    if (err || !course) return resOrContext.status(404).send('Course not found');
    resOrContext.render({ course });
  });
};

exports.createBooking = (req, res) => {
  const { name, email } = req.body;
  const courseId = req.params.courseId;
  const booking = {
    name,
    email,
    courseId,
    date: new Date()
  };
  Booking.insert(booking, (err) => {
    if (err) return res.status(500).send('Booking failed.');
    res.redirect('/');
  });
};