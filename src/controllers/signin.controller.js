const jwt = require("jsonwebtoken");
const secretKey = require("../config/secret.config");
const UserModel = require("../models/user");

const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      res.status(404).json({ message: `User Not found` });
      return;
    }

    let isPasswordValid = req.body.password === user.password;
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
    res.status(201).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      roles: user.roles,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

module.exports = signin;
