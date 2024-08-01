const { User } = require("../models");

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
}

module.exports = UserRepository;
