require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const cohereapi = require("./cohereapi.js");
db.sequelize.sync();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bedroom Stories backend." });
});

app.post("/generate-story", async(req,res) => {
    try {
      const generatedText = await cohereapi(req.body);
      res.send({
        generatedText
      })
    }
    catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the Bedtime Story.",
      });
    }
})

require("./app/routes/auth.routes.js")(app);
require("./app/routes/member.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
