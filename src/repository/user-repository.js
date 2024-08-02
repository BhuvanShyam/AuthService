const { User, Role } = require("../models");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");
const { StatusCodes } = require("http-status-codes");
const AppErrors  = require('../utils/error-handler')

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error); // Rethrow as ValidationError
      }
      console.log("Something went wrong in repo layer:", error);
      throw new AppErrors(
        "RepositoryError",
        "An error occurred while creating the user",
        "Database operation failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({ where: { id: userId } });
      return user;
    } catch (error) {
      console.log("Something went wrong in repo layer:", error);
      throw new AppErrors(
        "RepositoryError",
        "An error occurred while deleting the user",
        "Database operation failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, { attributes: ["email", "id"] });
      return user;
    } catch (error) {
      console.log("Something went wrong in repo layer:", error);
      throw new AppErrors(
        "RepositoryError",
        "An error occurred while fetching the user",
        "Database operation failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getByemail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Please check the email as there is no record of the email",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in repo layer:", error);
      throw new AppErrors(
        "RepositoryError",
        "An error occurred while fetching the user by email",
        "Database operation failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({ where: { name: "ADMIN" } });
      if (user && adminRole) {
        return user.hasRole(adminRole);
      }
      throw new AppErrors(
        "AuthorizationError",
        "User or Admin role not found",
        "Failed to determine user role",
        StatusCodes.NOT_FOUND
      );
    } catch (error) {
      console.log("Something went wrong in isAdmin role comparison:", error);
      throw new AppErrors(
        "RepositoryError",
        "An error occurred while checking user admin role",
        "Database operation failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = UserRepository;
