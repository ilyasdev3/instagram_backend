const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// const verifyToken = async (req, res, next) => {
// 	const authHeader = req.headers.authorization
// 	if (!authHeader) return res.status(401).send('Unauthorized')
// 	const token = authHeader.split(' ')[1]

// 	try {
// 		jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
// 			if (err) return res.status(401).send('Unauthorized')

// 			req.userId = payload.id
// 			req.isAdmin = payload.isAdmin
// 			next()
// 		})
// 	} catch (error) {
// 		console.log(error)
// 		return res.status(500).json({ message: 'Internal server error' })
// 	}
// }

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Unauthorized");
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      req.userId = payload.id;
      req.isAdmin = payload.isAdmin;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyToken };
