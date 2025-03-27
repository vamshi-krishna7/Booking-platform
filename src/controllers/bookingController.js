const { Booking, EventSlot } = require("../../models");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { event_slot_id } = req.body;

    const eventSlot = await EventSlot.findOne({
      where: { id: event_slot_id },
      raw: true,
    });

    if (!eventSlot) {
      return res.status(404).json({ message: "Event slot not found" });
    }

    if (eventSlot.remaining_slots <= 0) {
      return res
        .status(400)
        .json("Event slots are full, try choosing another slot");
    }

    // check if reamining slots are present firstly
    if (eventSlot.remaining_slots > 0) {
      // update the slot if version number matches
      const [eventSloted] = await EventSlot.update(
        {
          remaining_slots: eventSlot.remaining_slots - 1,
          version: eventSlot.version + 1,
        },
        {
          where: {
            id: event_slot_id,
            version: eventSlot.version,
          },
        }
      );
      if (eventSloted === 0) {
        return res
          .status(500)
          .json({
            message: "Sorry failed to book your slot. please try again",
          });
      }

      // create confirmed booking
      await Booking.create({
        user_id: userId,
        event_slot_id: eventSlot.id,
        status: "confirmed",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return res
      .status(201)
      .json({ message: "Successfully confirmed your booking" });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createBooking };
