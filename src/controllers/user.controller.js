const { ObjectId } = require("mongodb");
const UserModel = require("../models/user");

const addUser = async (req, res) => {
  try {
    const newUser = new UserModel({ ...req.body, addedBy: req.userId });
    const response = await newUser.save(newUser);
    if (response) {
      res
        .status(201)
        .json({ message: "user successfully registered", data: response });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      { roles: { $in: ["patient"] } },
      { password: 0 }
    ).populate("addedBy");
    if (users) {
      res.status(200).send(users);
      return;
    }
    res.status(400).send({ message: "user not found" });
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id }, { password: 0 }).populate(
      "addedBy"
    );
    if (user) {
      res.status(200).send(user);
      return;
    }
    res.status(401).send({ message: "user not sound" });
    return;
  } catch (err) {
    res.status(200).send({ message: err.message });
    return;
  }
};

const getYourPatient = async (req, res) => {
  try {
    console.log(req.userId);
    const users = await UserModel.find({
      addedBy: req.userId,
      roles: { $in: ["patient"] },
    }).populate("addedBy");
    if (users) {
      res.status(200).send(users);
      return;
    }
    res.status(400).send({ message: "user not found" });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const updateUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "update info can't be empty" });
    return;
  }
  const { id } = req.params;
  try {
    const response = await UserModel.findByIdAndUpdate(id, req.body, {});
    if (!response) {
      res.status(400).send({ message: `can't update with id ${id}` });
      return;
    } else {
      // 
      const data = {
        ...req.body,
        _id: id,
        createdAt: response.createdAt,
        profilePicture: response.profilePicture,
      };

      res.status(201).send({ message: "data successfully updated", data });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (ObjectId.isValid(id)) {
      const response = await UserModel.findByIdAndRemove(id);
      if (response) {
        res.status(200).json({ message: "successfully deleted" });
        return;
      } else {
        res.status(400).send({ message: `user with id ${id} not found` });
        return;
      }
    } else {
      res.status(400).send({ message: "wrong id" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getYourPatient,
};
