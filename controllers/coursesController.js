const Course = require('../models/courses');

exports.listCourses = (req, resOrContext) => {
  Course.find({}, (err, courses) => {
    if (err) return resOrContext.status(500).send('Database error.');
    resOrContext.render({ courses });
  });
};