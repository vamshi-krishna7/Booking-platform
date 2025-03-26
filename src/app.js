const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const logger = require("./config/logger");

const app = express();
app.use(express.json());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = 5005;
let server;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, async () => {
    logger.info('winston logs====================================================');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    try {
      await sequelize.sync();
      console.log("✅ Database synchronized!");
    } catch (error) {
      console.error("❌ Error syncing database:", error);
    }
  });
}

module.exports = { app, server };
