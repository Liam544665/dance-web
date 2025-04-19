const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const renderWithLayout = require('../middleware/renderWithLayout');

router.get('/', (req, res) => {
  coursesController.listCourses(req, {
    render: (viewData) => {
      renderWithLayout('courses', { ...viewData, title: 'Courses' }, req, res);
    },
    status: (code) => res.status(code)
  });
});

module.exports = router;
