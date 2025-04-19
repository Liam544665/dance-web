const { usersDB, coursesDB, bookingsDB } = require('../db');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');
const renderWithLayout = require('../middleware/renderWithLayout');
const Datastore = require('nedb');


router.get('/', isAdmin, (req, res) => {
  adminController.dashboard(req, {
    render: (viewData) => {
      renderWithLayout('admin', { ...viewData, title: 'Admin' }, req, res);
    },
    status: (code) => res.status(code)
  });
});

router.get('/courses/new', isAdmin, adminController.showNewCourseForm);
router.post('/courses/new', isAdmin, adminController.createCourse);
router.get('/courses/edit/:id', isAdmin, adminController.showEditCourseForm);
router.post('/courses/edit/:id', isAdmin, adminController.updateCourse);
router.post('/courses/delete/:id', isAdmin, adminController.deleteCourse);

router.get('/users', isAdmin, (req, res) => {
  usersDB.find({}, (err, users) => {
    if (err) return res.status(500).send('DB error');
    renderWithLayout('admin_users', { title: 'Manage Users', users }, req, res);
  });
});

router.post('/users/:id/promote', isAdmin, (req, res) => {
  usersDB.update({ _id: req.params.id }, { $set: { role: 'admin' } }, {}, err => {
    if (err) return res.status(500).send('Failed to promote');
    res.redirect('/admin/users');
  });
});

router.post('/users/:id/demote', isAdmin, (req, res) => {
  usersDB.update({ _id: req.params.id }, { $set: { role: 'user' } }, {}, err => {
    if (err) return res.status(500).send('Failed to demote');
    res.redirect('/admin/users');
  });
});

router.post('/users/:id/delete', isAdmin, (req, res) => {
  usersDB.remove({ _id: req.params.id }, {}, err => {
    if (err) return res.status(500).send('Failed to delete user');
    res.redirect('/admin/users');
  });
});

module.exports = router;
