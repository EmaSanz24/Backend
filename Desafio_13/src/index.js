import express from "express";
import { CartRouter, ProductRouter, TestRouter, ChatRouter, ProcessRouter, RandomsRouter } from "./routers/index.js";
import { config } from "./config/index.js";
import { URL } from "url";
import { router } from "./routers/session.js";
import { Sessions } from "./services/index.js";
import { PassportAuth } from "./middlewares/passportAuth.js";
import { cpus } from "os";
import cluster from "cluster";

const app = express();
const PORT = parseInt(process.argv[2]) || 8080;

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

if (cluster.isPrimary) {
  const lengthCpu = cpus.length;
  for (let index = 0; index < lengthCpu; index++) {
    cluster.fork();
  }
} else {
  const server = app.listen(PORT, () => console.log(`Server running on port ${server.address().port}`));
}
/* comandos en la terminal
pm2 start index.js --name="Server Fork 1" --watch - 8080
pm2 start index.js --name="Server Cluster" --watch  -i max - 8081
pm2 start index.js --name="Server Fork 2" --watch - 8082
pm2 start index.js --name="Server Fork 3" --watch - 8083
pm2 start index.js --name="Server Fork 4" --watch - 8084
pm2 start index.js --name="Server Fork 5" --watch - 8085
*/
