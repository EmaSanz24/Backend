import express from "express";
import { CartRouter, ProductRouter, TestRouter, ChatRouter } from "./routers/index.js";
import { config } from "./config/index.js";
import { URL } from "url";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
const __dirname = new URL(".", import.meta.url).pathname;
const dirname = __dirname.split("/").slice(1).join("/");

app.get("/", (req, res) => {
  res.sendFile(dirname + "public/index.html");
});
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/products-test", TestRouter);

const server = app.listen(config.SERVER.PORT, () => console.log(`Server running on port ${server.address().port}`));
