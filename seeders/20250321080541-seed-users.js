"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert("users", [
      {
        full_name: "Alice Johnson",
        email: "alice@example.com",
        password: hashedPassword,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Bob Smith",
        email: "bob@example.com",
        password: hashedPassword,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Charlie Brown",
        email: "charlie@example.com",
        password: hashedPassword,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Diana Prince",
        email: "diana@example.com",
        password: hashedPassword,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
