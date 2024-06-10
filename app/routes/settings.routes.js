module.exports = (app) => {
  const Settings = require("../controllers/settings.controller");
  var router = require("express").Router();

  // Create a new setting
  router.post("/", Settings.create);

  // Retrieve all settings
  router.get("/", Settings.findAll);

  // Retrieve a single setting with id
  router.get("/:id", Settings.findOne);

  // Update a setting with id
  router.put("/:id", Settings.update);

  // Delete a setting with id
  router.delete("/:id", Settings.delete);

  // Delete all settings
  router.delete("/", Settings.deleteAll);

  app.use("/settings", router);
};
