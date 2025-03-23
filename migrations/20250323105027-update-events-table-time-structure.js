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
    await queryInterface.addColumn("events", "event_type", {
      type: Sequelize.ENUM("fixed", "recurring"),
      allowNull: false,
      defaultValue: "fixed",
    });

    await queryInterface.addColumn("events", "start_time", {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.addColumn("events", "end_time", {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.addColumn("events", "recurring_days", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn("events", "slot_duration", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("events", "total_slots", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("events", "waitlist_slots", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("events", "description", {
      type: Sequelize.TEXT,
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
    await queryInterface.removeColumn("events", "event_type");
    await queryInterface.removeColumn("events", "start_time");
    await queryInterface.removeColumn("events", "end_time");
    await queryInterface.removeColumn("events", "recurring_days");
  }
};
