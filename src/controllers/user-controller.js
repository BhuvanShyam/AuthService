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
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Error in user creation:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred",
      error: error.explanation || "An error occurred",
      data: {},
      success: false,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      message: "User signed in successfully",
      data: { token: response },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Error during sign-in:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred",
      error: error.explanation || "An error occurred",
      data: {},
      success: false,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "User authenticated successfully",
      data: { userId: response },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Error during authentication:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred",
      error: error.explanation || "An error occurred",
      data: {},
      success: false,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      message: "User is admin",
      data: { isAdmin: response },
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Error checking admin status:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred",
      error: error.explanation || "An error occurred",
      data: {},
      success: false,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
