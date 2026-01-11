const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

exports.sendTokenResponse = (user, statusCode, res) => {
  const token = exports.generateToken(user._id);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
