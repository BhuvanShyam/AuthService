const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step 1 -> fetch user by email
      const user = await this.userRepository.getByemail(email);

      //step-02 incoming password with stored encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("password doesnt match");
        throw { error: "Incorrect password" };
      }

      //step-03 -> create token and send it to the user
      const newJWT = this.createtoken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("something went wrong in sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const rseponse = this.verifyToken(token);
      if (!rseponse) {
        throw { error: "Invalid token" };
      }
      const user =  await this.userRepository.getById(rseponse.id);
      if (!user) {
        throw { error: "No user with corresponding token is found" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in auth process");
      throw error;
    }
  }

  createtoken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in verifyig the token", error);
      throw error;
    }
  }

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
