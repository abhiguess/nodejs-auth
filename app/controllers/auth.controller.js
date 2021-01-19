const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Create and Save a new Tag
exports.signup = (req, res) => {

  // Create a User
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  // Save Save in the database
  user
    .save(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


// Create and Save a new Tag
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not such user found" });
      else {
        // res.send(data.password);

        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          data.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        let token = jwt.sign({ id: data.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          name: data.name,
          username: data.username,
          accessToken: token
        });
      };
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User : " + err });
    });
};
