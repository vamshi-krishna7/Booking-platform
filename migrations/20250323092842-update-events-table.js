'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    await queryInterface.removeColumn("events", "slot_duration");
    await queryInterface.removeColumn("events", "totalSlots");
    await queryInterface.removeColumn("events", "waitlistSlots");

    await queryInterface.addColumn("events", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("events", "slot_duration", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("events", "totalSlots", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("events", "waitlistSlots", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.removeColumn("events", "description");
  }
};
