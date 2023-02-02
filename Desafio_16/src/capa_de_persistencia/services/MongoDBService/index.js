import mongoose from "mongoose";
import { config } from "../../../config/index.js";

const init = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.DATABASES.mongo.url, { dbName: config.DATABASES.mongo.dbName });
    console.log("Connection with MongoDB established");
  } catch (error) {
    console.log(error);
  }
};

export const MongoDBService = {
  init,
};
