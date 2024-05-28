const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Member = require("./member.model.js")(sequelize, Sequelize);
db.Story = require("./story.model.js")(sequelize, Sequelize);
db.Genre = require("./genre.model.js")(sequelize, Sequelize);
db.Language = require("./language.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);
db.Settings = require("./settings.model.js")(sequelize, Sequelize);

// Define associations
db.Member.hasMany(db.Story, { as: "stories", foreignKey: "memberId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Member, { as: "author", foreignKey: "memberId", onDelete: "CASCADE" });

db.Genre.hasMany(db.Story, { as: "stories", foreignKey: "genreId", onDelete: "CASCADE" });
db.Story.belongsTo(db.Genre, { as: "genre", foreignKey: "genreId", onDelete: "CASCADE" });

db.Member.hasMany(db.Session, { as: "sessions", foreignKey: "memberId", onDelete: "CASCADE" });
db.Session.belongsTo(db.Member, { as: "user", foreignKey: "memberId", onDelete: "CASCADE" });

module.exports = db;
