const db = require("../models");
const Genre = db.Genre;
const Op = db.Sequelize.Op;

// Create and Save a new Genre
exports.create = (req, res) => {
  if (!req.body.genreName) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const genre = { genreName: req.body.genreName };

  Genre.create(genre)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while creating the Genre."
    }));
};

// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
  const genreName = req.query.genreName;
  const condition = genreName ? { genreName: { [Op.like]: `%${genreName}%` } } : null;

  Genre.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving genres."
    }));
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find Genre with id=${id}.` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error retrieving Genre with id=" + id
    }));
};

// Update a Genre by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Genre.update(req.body, { where: { genreId: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Genre was updated successfully." });
      } else {
        res.send({ message: `Cannot update Genre with genreId=${id}. Maybe Genre was not found or req.body is empty!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Error updating Genre with genreId=" + id
    }));
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({ where: { genreId: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Genre was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Genre with genreId=${id}. Maybe Genre was not found!` });
      }
    })
    .catch(err => res.status(500).send({
      message: err.message || "Could not delete Genre with genreId=" + id
    }));
};

// Delete all Genres from the database.
exports.deleteAll = (req, res) => {
  Genre.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} Genres were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all genres."
    }));
};
