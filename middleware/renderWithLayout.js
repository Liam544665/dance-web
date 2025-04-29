module.exports = function(view, data, req, res) {
  res.render(view, {
    ...data,
    layout: 'layout'
  });
};