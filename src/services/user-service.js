const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
const AppErrors = require("../utils/error-handler");
const { StatusCodes } = require("http-status-codes");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      return await this.userRepository.create(data);
    } catch (error) {
      if (error instanceof AppErrors) {
        throw error; // Propagate known AppErrors
      }
      console.log("Service error:", error);
      throw new AppErrors(
        "ServiceError",
        "Something went wrong in the service layer",
        "Logical issue found",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByemail(email);
      if (!user) {
        throw new AppErrors(
          "AuthenticationError",
          "User not found",
          "The email provided does not match any user",
          StatusCodes.NOT_FOUND
        );
      }
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        throw new AppErrors(
          "AuthenticationError",
          "Incorrect password",
          "The provided password does not match",
          StatusCodes.UNAUTHORIZED
        );
      }
      return this.createtoken({ email: user.email, id: user.id });
    } catch (error) {
      if(error.name == 'AttributeNotfound'){
        throw error;
      }
      console.log("Something went wrong in the sign-in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw new AppErrors(
          "AuthenticationError",
          "Invalid token",
          "The provided token is invalid",
          StatusCodes.UNAUTHORIZED
        );
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw new AppErrors(
          "AuthenticationError",
          "No user found",
          "No user found with the provided token",
          StatusCodes.NOT_FOUND
        );
      }
      return user.id;
    } catch (error) {
      if (error instanceof AppErrors) {
        throw error; // Propagate known AppErrors
      }
      console.log("Error during authentication:", error);
      throw new AppErrors(
        "ServiceError",
        "Something went wrong during authentication",
        "Logical issue found",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  createtoken(user) {
    try {
      return jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
    } catch (error) {
      console.log("Error creating token:", error);
      throw new AppErrors(
        "TokenError",
        "Error creating token",
        "Failed to create JWT",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.log("Error verifying token:", error);
      throw new AppErrors(
        "TokenError",
        "Error verifying token",
        "Failed to verify JWT",
        StatusCodes.UNAUTHORIZED
      );
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Error comparing passwords:", error);
      throw new AppErrors(
        "PasswordError",
        "Error comparing passwords",
        "Failed to compare passwords",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isAdmin(userId) {
    try {
      return await this.userRepository.isAdmin(userId);
    } catch (error) {
      if (error instanceof AppErrors) {
        throw error; // Propagate known AppErrors
      }
      console.log("Error checking admin status:", error);
      throw new AppErrors(
        "ServiceError",
        "Something went wrong while checking admin status",
        "Logical issue found",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = UserService;
