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

router.get("/isAuthenticated", UserController.isAuthenticated);


router.get('/dummy',(req,res) =>{
 return  res.status(200).json({
    message: 'Hello from dummy route',
  })
})

module.exports = router;
