const db = require("../models");
const Session = db.Session;
const Op = db.Sequelize.Op;


// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Session.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving sessions."
    }));
};
