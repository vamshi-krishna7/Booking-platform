const { Booking, EventSlot } = require("../../models");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const { event_slot_id } = req.body;

    // Step 1: Find the event slot
    const eventSlot = await EventSlot.findOne({ where: { id: event_slot_id }, raw: true });

    if (!eventSlot) {
      return res.status(404).json({ message: "Event slot not found" });
    }

    console.log("🚀 ~ createBooking ~ eventSlot:", eventSlot)
    // check if reamining slots are present firstly
    if (eventSlot.remaining_slots > 0) {
      // update the slot if version number matches
      const eventSloted = await EventSlot.update(
        {
          remaining_slots: eventSlot.remaining_slots - 1,
          version: eventSlot.version + 1,
        },
        {
          where: {
            id: event_slot_id,
            version: eventSlot.version
          },
        }
      );
      console.log("🚀 ~ createBooking ~ eventSloted:", eventSloted)

      // create confirmed booking
      await Booking.create({
        user_id: userId,
        event_id: eventSlot.event_id,
        slot_time: eventSlot.start_time,
        slot_time: eventSlot.start_time,
        status: "confirmed",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return res.status(201).json({ message: "Successfully confirmed your booking" });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createBooking };
