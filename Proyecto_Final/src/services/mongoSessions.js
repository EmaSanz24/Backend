import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "../config/index.js";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const Sessions = {
  mongo: session({
    store: MongoStore.create({
      mongoUrl: `${config.DATABASES.mongo.url}?dbName=Backend`,
      mongoOptions,
      ttl: 600,
      collectionName: "sessions",
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }),
};
