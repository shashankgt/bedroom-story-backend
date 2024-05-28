module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("Language", {
      languageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      languageName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Language;
  };  