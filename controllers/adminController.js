const Course = require('../models/courses');
const Booking = require('../models/bookings');
const User = require('../models/users');

exports.dashboard = (req, resOrContext) => {
  Course.find({}, (err, courses) => {
    if (err) return resOrContext.status(500).send('Database error.');
    resOrContext.render({ courses });
  });
};

exports.showNewCourseForm = (req, res) => {
  res.render('adminCourseForm', { title: 'Add New Course' });
};

exports.createCourse = (req, res) => {
  Course.insert(req.body, (err) => {
    if (err) return res.status(500).send('Error creating course');
    res.redirect('/admin');
  });
};

exports.showEditCourseForm = (req, res) => {
  Course.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.status(404).send('Course not found');
    res.render('adminCourseForm', { title: 'Edit Course', course });
  });
};

exports.updateCourse = (req, res) => {
  Course.update({ _id: req.params.id }, req.body, {}, (err) => {
    if (err) return res.status(500).send('Error updating course');
    res.redirect('/admin');
  });
};

exports.deleteCourse = (req, res) => {
  Course.remove({ _id: req.params.id }, {}, (err) => {
    if (err) return res.status(500).send('Error deleting course');
    res.redirect('/admin');
  });
};