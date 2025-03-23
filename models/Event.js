"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // An Event has many Bookings
      Event.hasMany(models.Booking, { foreignKey: "event_id", as: "bookings" });
    }
  }

  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slot_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      waitlistSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: true,
    }
  );

  return Event;
};
