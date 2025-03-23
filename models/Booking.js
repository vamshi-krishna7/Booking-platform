"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Each Booking belongs to an Event
      Booking.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
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
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "events",
          key: "id",
        },
      },
      slotTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("confirmed", "waiting"),
        defaultValue: "confirmed",
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "bookings",
      timestamps: true,
    }
  );

  return Booking;
};
