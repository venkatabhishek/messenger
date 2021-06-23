const requireAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send({ message: 'User not authenticated' });

const resError = (res, str, err) =>
  res.status(400).send({ message: `${str} failed`, err});

module.exports = {
  requireAuth,
  resError
};
