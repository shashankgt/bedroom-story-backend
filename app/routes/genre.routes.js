module.exports = (app) => {
    const Genre = require("../controllers/genre.controller");
    var router = require("express").Router();
  
    // Retrieve all Genres
    router.get("/genres/", Genre.findAll);
  
    app.use("/", router);
  };
  