import express from "express";
import { config } from "./src/config/index.js";
import cluster from "cluster";
import { cpus } from "os";
import {
  CartRouter,
  ChatRouter,
  ProcessRouter,
  ProductRouter,
  RandomsRouter,
  TestRouter,
  LoginRouter,
} from "./src/capa_de_navegador/routers/index.js";
import { PassportAuth } from "./src/capa_de_navegador/middlewares/index.js";
import { Sessions } from "./src/capa_de_servicio/services/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { engine } from "express-handlebars";
import { routerPF } from "./src/capa_de_navegador/routers/router.js";
import logger from "./src/logs/logger.js";

const PORT = config.SERVER.PORT;
const clusterMode = process.argv[3] == "cluster";

if (clusterMode && cluster.isPrimary) {
  const lengthCpu = cpus.length;
  console.log(`Numero de procesadores: ${lengthCpu}
    PID MASTER: ${process.pid}`);
  for (let index = 0; index < lengthCpu; index++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log("Worker ", worker.process.pid, " died ", new Date().toLocaleDateString());
    cluster.fork();
  });
} else {
  const app = express();
  app.use(cookieParser());
  app.use(Sessions.mongo);
  app.engine("hbs", engine());
  app.set("view engine", "hbs");
  app.set("views", "./src/views");
  app.use(express.static("public"));
  app.use(express.json());
  //app.use(express.urlencoded({ extented: true }));

  app.use(passport.initialize());
  app.use(passport.session());
  PassportAuth.init(passport);

  app.use("/api/products", ProductRouter);
  app.use("/api/cart", CartRouter);
  app.use("/api/chat", ChatRouter);
  app.use("/api/products-test", TestRouter);
  app.use("/api/session", LoginRouter);
  app.use("/api/randoms", RandomsRouter);
  app.use("/info", ProcessRouter);
  app.use("/", routerPF);

  app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.send(`Ruta ${method} ${url} no está implementada`);
  });

  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log(`PID WORKER: ${process.pid}`);
}
