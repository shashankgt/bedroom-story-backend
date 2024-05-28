module.exports = (sequelize, Sequelize) => {
    const Story = sequelize.define("Story", {
      storyId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      storyTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      story: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Story;
  };
  