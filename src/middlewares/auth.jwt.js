const jwt = require("jsonwebtoken");
const secretKey = require("../config/secret.config");
const UserModel = require("../models/user");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(404).send({ message: "No token provided" });
    return;
  }
  try {
    const decoded =  jwt.verify(token, secretKey);
    req.userId = decoded.id;
    next();
    return
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};


const isDoc = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId, roles:"doctor"});
    if (user) {
      next();
      return;
    }
    res.status(404).send({ message: "you have to be a doctor" });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};


module.exports = { verifyToken, isDoc };
