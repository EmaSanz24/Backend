import express from "express";
import { config } from "./config/index.js";
import logger from "./logs/logger.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { passportAuth } from "./middlewares/passportAuth.js";
import { ProductRouter } from "./features/product/product.router.js";
import { CartRouter } from "./features/cart/cart.router.js";
import { MessageRouter } from "./features/messages/messages.router.js";
import { Sessions } from "./services/mongoSessions.js";
import { MailRouter } from "./features/orders/order.router.js";
import { UsersRouter } from "./features/user/user.router.js";

export const app = express();

app.use(Sessions.mongo);
app.use(cookieParser("secret"));
passportAuth.init();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/chat", MessageRouter);
app.use("/api/orders", MailRouter);
app.use("/", UsersRouter);

const server = app.listen(config.SERVER.PORT, () => logger.info(`Server running on PORT: ${server.address().port}`));
