module.exports = app => {
  const authJwt = require("../middleware/authJwt");
  const user = require("../controllers/user.controller");

  let router = require("express").Router();

  // Registering new User
  router.get("/allAccess", user.allAccess);

  // Existing user login
  router.get("/userBoard", [authJwt.verifyToken], user.userBoard);

  app.use('/api/user', router);
};

