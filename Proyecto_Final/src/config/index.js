import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";
const USERS_FILENAME = "users";
const MESSAGES_FILENAME = "messages";
const ORDERS_FILENAME = "orders";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
      USERS_FILENAME,
      MESSAGES_FILENAME,
      ORDERS_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
  },
};

const nodemailer = {
  name: "Emmy Schimmel",
  user: "emmy.schimmel@ethereal.email",
  password: "BWDQeBEaSFPDghTxrA",
};

export { config, nodemailer };
