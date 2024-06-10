module.exports = (app) => {
  const Role = require("../controllers/role.controller");
  var router = require("express").Router();

  // Create a new Role
  router.post("/roles/", Role.create);

  // Retrieve all Roles
  router.get("/roles/", Role.findAll);

  // Retrieve a single Role with id
  router.get("/roles/:id", Role.findOne);

  // Update a Role with id
  router.put("/roles/:id", Role.update);

  // Delete a Role with id
  router.delete("/roles/:id", Role.delete);

  // Delete all Roles
  router.delete("/roles/", Role.deleteAll);

  app.use("/", router);
};
