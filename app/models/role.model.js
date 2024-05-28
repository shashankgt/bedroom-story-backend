module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Role", {
      roleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Role;
  };
  