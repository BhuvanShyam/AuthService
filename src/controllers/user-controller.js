const UserService = require("../services/user-service");
const userService = new UserService();
const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: response,
      sucscess: true,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
      data: {},
      sucscess: false,
    });
  }
};

module.exports = {
  create,
};
