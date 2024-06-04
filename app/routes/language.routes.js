module.exports = (app) => {
    const Language = require("../controllers/language.controller");
    var router = require("express").Router();
  
    // Create a new Language
    router.post("/languages/", Language.create);
  
    // Retrieve all Languages
    router.get("/languages/", Language.findAll);
  
    // Retrieve a single Language with id
    router.get("/languages/:id", Language.findOne);
  
    // Update a Language with id
    router.put("/languages/:id", Language.update);
  
    // Delete a Language with id
    router.delete("/languages/:id", Language.delete);
  
    // Delete all Languages
    router.delete("/languages/", Language.deleteAll);
  
    app.use("/", router);
  };
  