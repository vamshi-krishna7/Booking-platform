"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all events from the database
    const events = await queryInterface.sequelize.query(
      `SELECT id, name, event_type, start_time, end_time, recurring_days, slot_duration FROM events;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const eventSlots = [];

    // Define default slot length (1 hour)
    
    events.forEach((event) => {
      const startTime = event.start_time;
      const endTime = event.end_time;
      const slotLength = event.slot_duration;

      let slotStart = new Date(`1970-01-01T${startTime}`);
      let slotEnd = new Date(`1970-01-01T${endTime}`);

      while (slotStart < slotEnd) {
        const nextSlot = new Date(slotStart);
        nextSlot.setMinutes(nextSlot.getMinutes() + slotLength);

        eventSlots.push({
          event_id: event.id,
          total_slots: 10, // Example default capacity
          waitlist_slots: 5, // Example waitlist capacity
          slot_length: slotLength,
          start_time: slotStart.toTimeString().split(" ")[0], // Convert to HH:MM:SS
          end_time: nextSlot.toTimeString().split(" ")[0], // Convert to HH:MM:SS
          created_at: new Date(),
          updated_at: new Date(),
        });

        slotStart = new Date(nextSlot);
      }
    });

    // Insert event slots into the database
    await queryInterface.bulkInsert("event_slots", eventSlots);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("event_slots", null, {});
  },
};
