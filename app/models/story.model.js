module.exports = (sequelize, Sequelize) => {
    const Story = sequelize.define("Story", {
      storyId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      story: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Story;
  };
  