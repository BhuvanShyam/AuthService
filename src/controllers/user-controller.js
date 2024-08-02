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

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      message: "User signed in successfully",
      data: response,
      sucscess: true,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Incorrect password",
      data: {},
      sucscess: false,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "User authenticated successfully",
      data: response,
      success: true,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in isAuthenticated",
      data: {},
      sucscess: false,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      message: "User is admin",
      data: response,
      err: {},
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong in isAdmin in controller",
      data: {},
      sucscess: false,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
