const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = { generateAuthToken };
