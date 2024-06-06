const db = require("../models");
const Language = db.Language;
const Op = db.Sequelize.Op;

// Create and Save a new Language
exports.create = (req, res) => {
  if (!req.body.languageName) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const language = { languageName: req.body.languageName };

  Language.create(language)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while creating the Language."
    }));
};

// Retrieve all Languages from the database.
exports.findAll = (req, res) => {
  const languageName = req.query.languageName;
  const condition = languageName ? { languageName: { [Op.like]: `%${languageName}%` } } : null;

  Language.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving languages."
    }));
};

// Find a single Language with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Language.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Language with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error retrieving Language with id=" + id
    }));
};

// Update a Language by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Language.update(req.body, { where: { languageId: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Language was updated successfully." });
      } else {
        res.send({ message: `Cannot update Language with languageId=${id}. Maybe Language was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error updating Language with languageId=" + id
    }));
};

// Delete a Language with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Language.destroy({ where: { languageId: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Language was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Language with languageId=${id}. Maybe Language was not found!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Could not delete Language with languageId=" + id
    }));
};

// Delete all Languages from the database.
exports.deleteAll = (req, res) => {
  Language.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Languages were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all languages."
    }));
};
