// function checkUser(req, res, next) {
//   if (req.session.login) {
//     next();
//   } else {
//     res.redirect('/user/login');
//   }
// }

function secureRoute(req, res, next) {
  if (!req.session.login) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = { secureRoute };