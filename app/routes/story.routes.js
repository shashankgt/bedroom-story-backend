module.exports = (app) => {
    const Story = require("../controllers/story.controller");
    var router = require("express").Router();
  
    // Create a new Story
    router.post("/stories/", Story.create);
  
    // Retrieve all Stories
    router.get("/stories/", Story.findAll);

    router.get("/sizes/", Story.findAllSizes);
  
    // Retrieve a single Story with id
    router.get("/stories/:id", Story.findOne);

    app.use("/", router);
  };
  