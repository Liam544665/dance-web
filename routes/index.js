const express = require('express');
const router = express.Router();
const renderWithLayout = require('../middleware/renderWithLayout');

router.get('/', (req, res) => {
  renderWithLayout('index', { title: 'Home' }, req, res);
});

module.exports = router;