module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("Member", {
    memberId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    hasAdminAccess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Member;
};
