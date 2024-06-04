const db = require("../models");
const Language = db.Language;
const Op = db.Sequelize.Op;

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
