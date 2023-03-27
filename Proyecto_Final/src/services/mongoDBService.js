import mongoose from "mongoose";
import { config } from "../config/index.js";
import logger from "../logs/logger.js";

const init = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.DATABASES.mongo.url, { dbName: config.DATABASES.mongo.dbName });
    logger.info("Connection with MongoDB established");
  } catch (error) {
    logger.error("error connecting to MongoDB", error);
  }
};

export const MongoDBService = { init };
