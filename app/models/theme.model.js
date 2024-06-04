module.exports = (sequelize, Sequelize) => {
    const Theme = sequelize.define("Theme", {
      themeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      themeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Theme;
}; 