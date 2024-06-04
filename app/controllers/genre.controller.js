const db = require("../models");
const Genre = db.Genre;
const Op = db.Sequelize.Op;


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
