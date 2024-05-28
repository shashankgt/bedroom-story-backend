const db = require("../models");
const Member = db.Member;
const Session = db.Session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  console.log("creating new user")
  if (req.body.fullName === undefined) {
    const error = new Error("Full name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("Email cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.password === undefined) {
    const error = new Error("Password cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }

  // find by email
  await Member.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (data) => {
      if (data) {
        res.status(400).send({ message: "This email is already in use." });
      } else {
        console.log("email not found");

        let salt = await getSalt();
        let hash = await hashPassword(req.body.password, salt);

        // Create a User
        const user = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          salt: salt,
          hasAdminAccess: req.body.hasAdminAccess || false,
        };

        // Save User in the database
        await Member.create(user)
          .then(async (data) => {
            res.status(201).send({
              message: "User created successfully. Please log in.",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + req.body.email,
      });
    });
};

// Log in a User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("first step")
  await Member.findOne({ where: { email: email } })
    .then(async (user) => {
      if (!user) {
        console.log("user not found")
        res.status(404).send({ message: "User not found." });
        return;
      }

      const isPasswordValid = await hashPassword(password, user.salt) === user.password;

      if (!isPasswordValid) {
        console.log("invalid pwd")
        res.status(401).send({ message: "Invalid password." });
        return;
      }

      // Create a Session for the user
      let expireTime = new Date();
      expireTime.setDate(expireTime.getDate() + 1);

      const session = {
        email: user.email,
        memberId: user.memberId,
        expirationDate: expireTime,
      };

      await Session.create(session)
        .then(async (data) => {
          console.log("creating session")
          let sessionId = data.id;
          let token = await encrypt(sessionId);
          let userInfo = {
            email: user.email,
            fullName: user.fullName,
            id: user.memberId,
            token: token,
          };
          res.send(userInfo);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the session.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error logging in with email=" + email,
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Member.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  Member.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Member.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
