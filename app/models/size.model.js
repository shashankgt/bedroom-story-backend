module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define("Size", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      sizeName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Size;
  };
  