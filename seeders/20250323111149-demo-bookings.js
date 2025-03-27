"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch users, events, and event slots
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const events = await queryInterface.sequelize.query(
      `SELECT id FROM events;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const eventSlots = await queryInterface.sequelize.query(
      `SELECT id, event_id, start_time FROM event_slots;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!users.length || !events.length || !eventSlots.length) {
      console.log("⚠️ Skipping bookings seeding - no users, events, or slots found.");
      return;
    }

    const bookings = [];

    users.forEach((user) => {
      const randomSlot = eventSlots[Math.floor(Math.random() * eventSlots.length)];
      
      // Convert TIME to full TIMESTAMP using today's date
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      bookings.push({
        user_id: user.id,
        event_slot_id: randomSlot.id,
        status: Math.random() > 0.2 ? "confirmed" : "waiting", // 80% confirmed, 20% waiting
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    // Insert into database
    await queryInterface.bulkInsert("bookings", bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
