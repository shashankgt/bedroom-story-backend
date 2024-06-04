module.exports = (app) => {
    const Theme = require("../controllers/theme.controller");
    var router = require("express").Router();
  
    // Retrieve all Themes
    router.get("/themes/", Theme.findAll);
  
    app.use("/", router);
};