module.exports = (app) => {
    const Settings = require("../controllers/settings.controller");
    var router = require("express").Router();
  
    // Retrieve all settings
    router.get("/", Settings.findAll);
  
    app.use("/settings", router);
  };
