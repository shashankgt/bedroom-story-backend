module.exports = (app) => {
  const Member = require("../controllers/member.controller");
  var router = require("express").Router();

  // Create a new User
  router.post("/members/", Member.create);

  // Retrieve all members
  router.get("/members/", Member.findAll);

  // Retrieve a single User with id
  router.get("/members/:id", Member.findOne);

  // Update a User with id
  router.put("/members/:id", Member.update);

  // Delete a User with id
  router.delete("/members/:id", Member.delete);

  // Delete all User
  router.delete("/members/", Member.deleteAll);

  app.use("/", router);
};
