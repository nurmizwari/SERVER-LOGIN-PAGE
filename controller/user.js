const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Invalid Email or Password" };
      }
      const comparePW = bcrypt.compareSync(password, user.password);
      if (!comparePW) {
        throw { name: "Invalid Email or Password" };
      }
      const payload = {
        name: user.username,
      };
      const rahasia = process.env.JWT_TOKEN;
      const access_token = jwt.sign(payload, rahasia);

      res.status(200).json({
        access_token,
        name: payload.name,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
