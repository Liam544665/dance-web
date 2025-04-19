const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const layoutPath = path.join(__dirname, '..', 'views', 'layout.mustache');

module.exports = function renderWithLayout(viewName, viewData = {}) {
  const layout = fs.readFileSync(layoutPath, 'utf-8');
  const view = fs.readFileSync(
    path.join(__dirname, '..', 'views', `${viewName}.mustache`),
    'utf-8'
  );

  const body = mustache.render(view, viewData);
  return mustache.render(layout, { ...viewData, body });
};