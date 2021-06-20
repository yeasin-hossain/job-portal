const { verify } = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const Auth = (req, res, next) => {
  // Getting Token
  const authHeader = req.headers.authorization;
  const authBearer = authHeader && authHeader.startsWith('Bearer ') ? authHeader : null;
  const token = authBearer ? authBearer.split('Bearer ')[1] : null;

  try {
    // If Token not null
    if (!token) {
      return res.status(200).json({ message: 'Un-authorized Access' });
    }

    // Verifying Token valid or not

    // eslint-disable-next-line consistent-return
    verify(token, process.env.JWT_SECRET, (err, tokenData) => {
      if (!err) {
        // Set currentUser Data
        req.currentUser = Object.freeze({
          id: tokenData.id,
          fullName: tokenData.FullName,
          email: tokenData.Email,
          ban: tokenData.ban,
          role: tokenData.role,
        });
        next();
      } else {
        return res.status(403).json({
          message: 'Un-authorized Access',
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = Auth;
