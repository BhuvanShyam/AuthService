const express = require("express");
const UserController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middlewares");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidator.validataUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidator.validataUserAuth,
  UserController.signIn
);

module.exports = router;
