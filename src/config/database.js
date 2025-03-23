const { Sequelize } = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize("bookings", "postgres", "testing", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  define: {
    freezeTableName: true, 
    underscored: true,  
  },
  migrationStorageTableName: "sequelize_meta",
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
