module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  let router = require("express").Router();

  // Registering new User
  router.post("/signup", auth.signup);

  // Existing user login
  router.post("/signin", auth.signin);


  app.use('/api/auth', router);
};
