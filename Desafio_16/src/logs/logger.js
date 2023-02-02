import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "./src/logs/warnings.log", level: "warn" }),
      new winston.transports.File({ filename: "./src/logs/error.log", level: "error" }),
    ],
  });
  return prodLogger;
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "info" })],
  });
  return devLogger;
}

let logger = null;

if (process.env.NODE_ENV === "PROD") {
  logger = buildProdLogger();
} else {
  logger = buildDevLogger();
}

export default logger;
