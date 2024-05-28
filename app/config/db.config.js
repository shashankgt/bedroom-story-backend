module.exports = {
  HOST: "localhost",
  USER: "StoryTeller",
  PASSWORD: "12345",
  DB: "storyTeller",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
