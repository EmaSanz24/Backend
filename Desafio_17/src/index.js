import express from "express";
import { CartRouter, ProductRouter, TestRouter, ChatRouter, ProcessRouter, RandomsRouter } from "./routers/index.js";
import { config } from "./config/index.js";
import { URL } from "url";

import { router } from "./routers/session.js";
import { Sessions } from "./services/index.js";
import { PassportAuth } from "./middlewares/passportAuth.js";

const app = express();

PassportAuth.init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./public"));
// const __dirname = new URL(".", import.meta.url).pathname;
// const dirname = __dirname.split("/").slice(1).join("/");

// app.get("/", (req, res) => {
//   res.sendFile(dirname + "public/index.html");
// });
app.use(Sessions.mongo);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/products-test", TestRouter);
app.use("/api/session", router);
app.use("/info", ProcessRouter);
app.use("/api/randoms", RandomsRouter);

const server = app.listen(config.SERVER.PORT, () => console.log(`Server running on port ${server.address().port}`));
