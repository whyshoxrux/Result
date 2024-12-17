import winston from "winston";
import "winston-mongodb";

const url = "mongodb://localhost:27017/appLogs";

export const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: url,
      collection: "error-logs",
      level: "error",
      options: { useUnifiedTopology: true },
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export const accessLogger = winston.createLogger({ 
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: url,
      collection: "access-logs",
      level: "info",
      options: { useUnifiedTopology: true },
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ], 
});
