// middleware/renderWithLayout.js
module.exports = function (viewName, viewData, req, res) {
    res.render(viewName, viewData, (err, html) => {
      if (err) {
        console.error('Render error:', err);
        return res.status(500).send('Render error');
      }
      res.render('layout', {
        ...res.locals,          // ✅ gets user and other locals
        ...viewData,
        body: html
      });
    });
  };
  