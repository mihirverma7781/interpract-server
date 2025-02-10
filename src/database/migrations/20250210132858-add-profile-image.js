"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "profile_image", {
      type: Sequelize.STRING, // Use Sequelize.STRING for file paths or URLs
      allowNull: true, // Allow null if profile image is optional
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "profile_image");
  },
};
