const db = require("../models");
const Settings = db.Settings;
const { Op } = db.Sequelize;

// Create and Save a new setting
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty!"
    });
    return;
  }

  // Create a setting
  const setting = {
    name: req.body.name
  };

  // Save setting in the database
  try {
    const data = await Settings.create(setting);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Setting."
    });
  }
};

// Retrieve all settings from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Settings.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving settings."
    });
  }
};

// Find a single setting with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Settings.findByPk(id);
    if (!data) {
      res.status(404).send({ message: "Setting not found" });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Setting with id=" + id
    });
  }
};

// Update a setting by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Settings.update(req.body, {
      where: { id: id }
    });
    if (data[0] === 1) {
      res.send({ message: "Setting was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update Setting with id=${id}. Maybe Setting was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Setting with id=" + id
    });
  }
};

// Delete a setting with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Settings.destroy({
      where: { id: id }
    });
    if (data === 1) {
      res.send({ message: "Setting was deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete Setting with id=${id}. Maybe Setting was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Setting with id=" + id
    });
  }
};

// Delete all settings from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Settings.destroy({
      where: {},
      truncate: false
    });
    res.send({ message: `${data} Settings were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all settings."
    });
  }
};
