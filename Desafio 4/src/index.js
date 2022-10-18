import express from "express";
import router from "./routes/products.js";
import { URL } from "url";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = new URL(".", import.meta.url).pathname;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on("error", (err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", router);

app.use("/api/form", express.static(__dirname + "public"));
console.log(__dirname + "public/index.html");
app.get("/api/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
