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
    await queryInterface.addColumn("event_slots", "remaining_slots", {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporarily allow NULL
    });

    await queryInterface.sequelize.query(`
      UPDATE event_slots 
      SET remaining_slots = total_slots;
    `);

    await queryInterface.changeColumn("event_slots", "remaining_slots", {
      type: Sequelize.INTEGER,
      allowNull: false, // Now enforce NOT NULL
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("event_slots", "remaining_slots");
  }
};
