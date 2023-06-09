const signin = require("../controllers/signin.controller");
const { addUser, getAllUsers, getOneUser, getYourPatient, deleteUser, updateUser, getMainInfo, addInfo } = require("../controllers/user.controller");
const { verifyToken, isDoc } = require("../middlewares/auth.jwt");
const {
  checkRoleExist,
  checkUsernameDuplication,
} = require("../middlewares/user.middleware");

const mainRoute = (app) => {
  const router = require("express").Router();

  router.post(
    "/addUser",
    [],
    addUser
  );
  router.post("/addPatient",[verifyToken, isDoc,checkRoleExist], addUser)
  router.post("/signin", [], signin);
  router.get("/getMainInfo/:id", [], getMainInfo)
  router.post("/addInfo/:fromArduino", [], addInfo)
  router.get("/users",[verifyToken,isDoc],getAllUsers)
  router.get("/user/:id",[verifyToken, isDoc],getOneUser)
  router.get("/myPatient",[verifyToken, isDoc],getYourPatient)
  router.delete("/user/:id",[verifyToken, isDoc], deleteUser)
  router.patch("/user/:id",[verifyToken, isDoc],updateUser)

  app.use("/api/biomed", router);
};

module.exports = mainRoute;
