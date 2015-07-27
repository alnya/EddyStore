/**
 * Gets the current user from session, or returns 403
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to controller
  if (req.session.user) {
    if (req.body != null) {
      req.body.User = req.session.user;
    }
    if(req.query) {
      req.query.User = req.session.user;
    }
    return next();
  }

  return res.send("You are not permitted to perform this action.", 403);

};
