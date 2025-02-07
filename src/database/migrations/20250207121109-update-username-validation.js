

module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.changeColumn("users", "user_name", {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, sequelize) => {
    await queryInterface.changeColumn("users", "user_name", {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true, // 🔄 Reverts to only alphanumeric characters
        len: [3, 20],
      },
    });
  },
};
