module.exports = (app) => {
    const Role = require("../controllers/role.controller");
    var router = require("express").Router();
  
    // Retrieve all Roles
    router.get("/roles/", Role.findAll);

    app.use("/", router);
  };
  