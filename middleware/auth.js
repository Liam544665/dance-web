// middleware/auth.js

exports.isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      next();
    } else {
      res.status(403).send('Access denied: Admins only.');
    }
  };
  