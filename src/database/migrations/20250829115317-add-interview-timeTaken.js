"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("interviews", "time_taken", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("interviews", "time_taken", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },
};
