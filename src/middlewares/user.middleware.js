const { ROLES } = require("../models");
const UserModel = require("../models/user");

const checkUsernameDuplication = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      res.status(401).send({ message: "username already taken" });
      return;
    }
    next();
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const checkRoleExist = async (req, res, next) => {
  if (req.body.roles) {
    let roleCount = req.body.roles.length;
    for (let i = 0; i < roleCount; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({ message: `${req.body.roles[i]} doesn't exist` });
        return;
      }
    }
  }
  next();
};

module.exports = { checkUsernameDuplication, checkRoleExist };
