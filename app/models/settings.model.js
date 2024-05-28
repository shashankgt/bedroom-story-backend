module.exports = (sequelize, Sequelize) => {
  const Settings = sequelize.define("Settings", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Settings;
};
