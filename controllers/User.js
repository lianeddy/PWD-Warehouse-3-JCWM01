const User = require("../models/User");
const Crypto = require("crypto");

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByCredentials(email, password);

      const token = await user.generateToken(user.dataValues);
      res.status(200).send(token);
    } catch (err) {
      console.log(err);
    }
  },
};
