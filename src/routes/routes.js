const signin = require("../controllers/signin.controller");
const { addUser, getAllUsers, getOneUser, getYourPatient, deleteUser, updateUser } = require("../controllers/user.controller");
const { verifyToken, isDoc } = require("../middlewares/auth.jwt");
const {
  checkRoleExist,
  checkUsernameDuplication,
} = require("../middlewares/user.middleware");

const mainRoute = (app) => {
  const router = require("express").Router();

  router.post(
    "/addUser",
    [verifyToken, checkRoleExist, checkUsernameDuplication, isDoc],
    addUser
  );
  router.post("/addPatient",[verifyToken, isDoc,checkRoleExist], addUser)
  router.post("/signin", [], signin);
  router.get("/users",[verifyToken,isDoc],getAllUsers)
  router.get("/user/:id",[verifyToken, isDoc],getOneUser)
  router.get("/myPatient",[verifyToken, isDoc],getYourPatient)
  router.delete("/user/:id",[verifyToken, isDoc], deleteUser)
  router.patch("/user/:id",[verifyToken, isDoc],updateUser)

  app.use("/api/biomed", router);
};

module.exports = mainRoute;
