/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  login: function (req, res) {
    var bcrypt = require('bcrypt');
    if (req.session.user) req.session.user = null;

    User.findOneByEmail(req.body.Email, function (err, user) {
      if (err) res.serverError(err);

      if (user) {
        bcrypt.compare(req.body.Password, user.Password, function (err, match) {
          if (err) res.serverError(err);

          if (match) {
            // password match
            req.session.user = user.id;
            req.session.authenticated = true;
            res.json(user);
          } else {
            // invalid password
            res.badRequest('Invalid Password');
          }
        });
      } else {
        res.notFound();
      }
    });
  },
  logout: function (req, res) {
    req.session.user = null;
    req.session.authenticated = false;
  }
};

