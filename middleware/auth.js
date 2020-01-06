const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const email = decodedToken.email;

    if (req.body.email && req.body.email !== email) {
      throw 'Invalid user';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'No token provided'
    });
  }
};
