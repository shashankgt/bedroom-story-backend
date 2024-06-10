const db = require("../models");
const Theme = db.Theme;
const Op = db.Sequelize.Op;

// Create and Save a new Theme
exports.create = (req, res) => {
  // Validate request
  if (!req.body.themeName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Theme
  const theme = {
    themeName: req.body.themeName
  };

  // Save Theme in the database
  Theme.create(theme)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Theme."
      });
    });
};

// Retrieve all Themes from the database.
exports.findAll = (req, res) => {
  const themeName = req.query.themeName;
  var condition = themeName ? { themeName: { [Op.like]: `%${themeName}%` } } : null;

  Theme.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving themes."
      });
    });
};

// Find a single Theme with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Theme.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Theme with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Theme with id=" + id
      });
    });
};

// Update a Theme by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Theme.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Theme was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Theme with id=${id}. Maybe Theme was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Theme with id=" + id
      });
    });
};

// Delete a Theme with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Theme.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Theme was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Theme with id=${id}. Maybe Theme was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Theme with id=" + id
      });
    });
};

// Delete all Themes from the database.
exports.deleteAll = (req, res) => {
  Theme.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Themes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all themes."
      });
    });
};