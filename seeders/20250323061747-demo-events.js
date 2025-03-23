"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "events",
      [
        {
          name: "Swimming",
          event_type: "recurring",
          start_time: "06:00:00",
          end_time: "09:00:00",
          slot_duration: 60,
          total_slots: 10,
          waitlist_slots: 5,
          recurring_days: JSON.stringify(["Monday", "Wednesday", "Friday"]),
          description: "Morning swimming sessions for beginners.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Yoga",
          event_type: "recurring",
          start_time: "07:00:00",
          end_time: "08:00:00",
          slot_duration: 30,
          total_slots: 10,
          waitlist_slots: 5,
          recurring_days: JSON.stringify(["Tuesday", "Thursday"]),
          description: "Relaxing yoga sessions with an expert.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Football Match",
          event_type: "fixed",
          start_time: "16:00:00",
          end_time: "18:00:00",
          recurring_days: null,
          slot_duration: 60,
          total_slots: 10,
          waitlist_slots: 5,
          description: "Exciting football match for all ages.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cooking Workshop",
          event_type: "fixed",
          start_time: "14:00:00",
          end_time: "16:00:00",
          recurring_days: null,
          slot_duration: 30,
          total_slots: 10,
          waitlist_slots: 5,
          description: "Learn to cook delicious meals.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Dance Class",
          event_type: "recurring",
          start_time: "17:00:00",
          end_time: "19:00:00",
          slot_duration: 60,
          total_slots: 10,
          waitlist_slots: 5,
          recurring_days: JSON.stringify(["Monday", "Wednesday", "Friday"]),
          description: "Learn various dance styles with experts.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("events", null, {});
  },
};
