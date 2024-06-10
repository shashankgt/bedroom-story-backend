module.exports = (app) => {
  const Genre = require("../controllers/genre.controller");
  var router = require("express").Router();

  // Create a new Genre
  router.post("/genres/", Genre.create);

  // Retrieve all Genres
  router.get("/genres/", Genre.findAll);

  // Retrieve a single Genre with id
  router.get("/genres/:id", Genre.findOne);

  // Update a Genre with id
  router.put("/genres/:id", Genre.update);

  // Delete a Genre with id
  router.delete("/genres/:id", Genre.delete);

  // Delete all Genres
  router.delete("/genres/", Genre.deleteAll);

  app.use("/", router);
};
