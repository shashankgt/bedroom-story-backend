const db = require("../models");
const Role = db.Role;

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const roleName = req.query.roleName;
  const condition = roleName ? { roleName: { [Op.like]: `%${roleName}%` } } : null;

  Role.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving roles."
    }));
};
