module.exports = (app) => {
    const Theme = require("../controllers/theme.controller");
    var router = require("express").Router();
  
    // Create a new Theme
    router.post("/themes/", Theme.create);
  
    // Retrieve all Themes
    router.get("/themes/", Theme.findAll);
  
    // Retrieve a single Theme with id
    router.get("/themes/:id", Theme.findOne);
  
    // Update a Theme with id
    router.put("/themes/:id", Theme.update);
  
    // Delete a Theme with id
    router.delete("/themes/:id", Theme.delete);
  
    // Delete all Themes
    router.delete("/themes/", Theme.deleteAll);
  
    app.use("/", router);
};