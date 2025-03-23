"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventSlot extends Model {
    static associate(models) {
      // An EventSlot belongs to an Event
      EventSlot.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
    }
  }

  EventSlot.init(
    {
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "events",
          key: "id",
        },
      },
      total_slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      waitlist_slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slot_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EventSlot",
      tableName: "event_slots",
      timestamps: true,
    }
  );

  return EventSlot;
};
