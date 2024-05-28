const db = require("../models");
const { hashPassword } = require("./crypto");
const User = db.Member;

authenticate = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = {};
  await User.findAll({ where: { email: email } })
    .then((data) => {
      user = data[0];
    })
    .catch((error) => {
      console.log(error);
    });
  if (user != null) {
    let hash = await hashPassword(password, user.salt);
    if (Buffer.compare(user.password, hash) !== 0) {
      console.log("invalid password")
      return res.status(401).send({
        message: "Invalid password!",
      });
    }
    return {
      type: "credentials",
      userId: user.memberId,
    };
  } else {
    return res.status(401).send({
      message: "User not found!",
    });
  }
  };
const auth = {
  authenticate: authenticate,
};

module.exports = auth;