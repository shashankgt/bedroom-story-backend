module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("Genre", {
      genreId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      genreName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Genre;
  };
  