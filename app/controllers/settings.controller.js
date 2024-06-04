const db = require("../models");
const Settings = db.Settings;

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
