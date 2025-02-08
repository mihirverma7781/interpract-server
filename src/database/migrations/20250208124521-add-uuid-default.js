module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "id", {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // ✅ Add default UUID
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "id", {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: null, // ❌ Remove default if rollback
    });
  },
};
