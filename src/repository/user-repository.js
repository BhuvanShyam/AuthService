const { User, Role } = require("../models");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  //get only email and id dont include or show password!!!!
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  async getByemail(userEmail) {
    try {
      const user = await User.findOne({
        where: { email: userEmail },
      });
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: { name: "ADMIN" },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("something went wrong in isAdmin role comparison");
      throw error;
    }
  }
}

module.exports = UserRepository;
