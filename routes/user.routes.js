const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifytToken.middlerware");

router.get("/user", verifyToken, userController.getUserById);

module.exports = router;
