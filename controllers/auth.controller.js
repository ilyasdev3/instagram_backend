const {
  generateAuthToken,
} = require("../middlewares/generateAuthToken.middleware");
const User = require("../models/user.model");
const { comaprePass, hashPassword } = require("../utils/comparePassword.utils");
const STATUS = require("../constant/status.constant");
const jwt = require("jsonwebtoken");

const controller = {};

controller.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "Please fill all required field" });

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword, "hashedPassword");

    const newUser = await User.create({
      ...req.body,
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(STATUS.CREATED)
      .json({ message: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

controller.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(STATUS.BAD_REQUEST).send("User does not exist");
    const comparePassword = await comaprePass(password, user.password);
    if (!comparePassword)
      return res.status(STATUS.BAD_REQUEST).send("Invalid credentials");

    const { password: pass, ...userWithoutPassword } = user._doc;
    console.log(userWithoutPassword);

    const token = generateAuthToken(user);
    console.log(token);
    res.set("Authorization", `Bearer ${token}`);

    return res.status(STATUS.SUCCESS).json({
      message: "login successfully",
      token,
      //   user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

controller.verifyToken = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    if (!token)
      return res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: "Access denied, token missing!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Invalid token" });
      return res
        .status(STATUS.SUCCESS)
        .json({ isValid: true, message: "Valid token" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = controller;
