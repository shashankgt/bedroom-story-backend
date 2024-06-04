module.exports = (app) => {
    const Session = require("../controllers/session.controller");
    var router = require("express").Router();
  
    // Retrieve all Sessions
    router.get("/sessions/", Session.findAll);

    app.use("/", router);
  };
  