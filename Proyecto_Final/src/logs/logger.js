import { format, createLogger, transports, addColors } from "winston";
import dotenv from "dotenv";
dotenv.config();

const { combine, colorize, timestamp, label, printf } = format;
let myCustomFormat = format.combine(
  colorize({ all: true }),
  label({ label: "[LOGGER]" }),
  timestamp({ format: "DD-MM-YY HH:MM:SS" }),
  printf((info) => ` ${info.timestamp} ${info.label}  ${info.level} : ${info.message}`)
);

addColors({
  info: "bold blue",
  warn: "italic yellow",
  error: "bold red",
  debug: "green",
});

function buildProdLogger() {
  const prodLogger = createLogger({
    transports: [
      new transports.File({ filename: "./src/logs/warnings.log", level: "warn" }),
      new transports.File({ filename: "./src/logs/error.log", level: "error" }),
    ],
  });
  return prodLogger;
}
function buildDevLogger() {
  const devLogger = createLogger({
    transports: [new transports.Console({ level: "debug", format: combine(myCustomFormat) })],
  });
  return devLogger;
}
let logger = process.env.NODE_ENV === "PROD" ? buildProdLogger() : buildDevLogger();

export default logger;
