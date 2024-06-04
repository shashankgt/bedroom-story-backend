const db = require("../models");
const Theme = db.Theme;
const Op = db.Sequelize.Op;


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
