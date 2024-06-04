module.exports = (app) => {
    const Language = require("../controllers/language.controller");
    var router = require("express").Router();

    // Retrieve all Languages
    router.get("/languages/", Language.findAll);
  
    app.use("/", router);
  };
  