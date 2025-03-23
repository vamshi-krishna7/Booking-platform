const winston = require("winston");
const LokiTransport = require("winston-loki");

const logger = winston.createLogger({
  //   level: "info",
  //   format: winston.format.json(),
  //   transports: [
  //     new winston.transports.File({ filename: "logs/app.log" }), // Logs to a file
  //   ],
  transports: [
    new LokiTransport({
      host: "http://localhost:3100",
      labels: { app: "booking-app" },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
    }),
  ],
});

module.exports = logger;
