const db = require("../models");
const Role = db.Role;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
  if (!req.body.roleName) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const role = { roleName: req.body.roleName };

  Role.create(role)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while creating the Role."
    }));
};

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

// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Role with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error retrieving Role with id=" + id
    }));
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Role was updated successfully." });
      } else {
        res.send({ message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error updating Role with id=" + id
    }));
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Role.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Role was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Role with id=${id}. Maybe Role was not found!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Could not delete Role with id=" + id
    }));
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Role.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Roles were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all roles."
    }));
};
