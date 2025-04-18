"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // An Event has many event slots
      Event.hasMany(models.EventSlot, { foreignKey: "event_id", as: "eventSlots" });
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: false,
    }
  );

  return Event;
};
