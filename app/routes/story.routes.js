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

    router.get('/stories/member/:memberId', Story.getStoriesByMemberId);
    router.put("/stories/:id", Story.update);
     
    router.delete("/stories/:id", Story.delete);
    router.delete("/stories/", Story.deleteAll);

    app.use("/", router);
  };
  