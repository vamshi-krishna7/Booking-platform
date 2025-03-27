"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Each Booking belongs to an Event slot
      Booking.belongsTo(models.EventSlot, { foreignKey: "event_slot_id", as: "event_slots" });
    }
  }

  Booking.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", 
          key: "id",     
        },
      },
      event_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "event_slots",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("confirmed", "waiting"),
        defaultValue: "confirmed",
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
      modelName: "Booking",
      tableName: "bookings",
      timestamps: false,
      underscored: true,
    }
  );

  return Booking;
};
