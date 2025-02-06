

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "experience", {
      type: Sequelize.SMALLINT,
      allowNull: true, // Allow NULL values
      defaultValue: null, // Optional: remove default value
    });

    await queryInterface.changeColumn("users", "tech_stack", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true, // Allow NULL values
      defaultValue: null, // Optional: remove default value
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "experience", {
      type: Sequelize.SMALLINT,
      allowNull: false, // Revert to previous schema
      defaultValue: 0,
    });

    await queryInterface.changeColumn("users", "tech_stack", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [],
    });
  },
};