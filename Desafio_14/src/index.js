import express from "express";
import { ProcessRouter, RandomsRouter } from "./routers/index.js";
import { cpus } from "os";
import cluster from "cluster";
import logger from "./logs/logger.js";

const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == "cluster";

if (modoCluster && cluster.isPrimary) {
  const lengthCpu = cpus.length;
  console.log(`Numero de procesadores: ${lengthCpu}
  PID MASTER: ${process.pid}`);
  for (let index = 0; index < lengthCpu; index++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log("Worker", worker.process.pid, "died", new Date().toLocaleString());
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/info", ProcessRouter);
  app.use("/api/randoms", RandomsRouter);

  app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.send(`Ruta ${method} ${url} no está implementada`);
  });

  const server = app.listen(PORT, () => console.log(`Server running on port ${server.address().port}`));
  console.log(`PID WORKER: ${process.pid}`);
}
/* 
sin gZip en /info : 600B
sin gZip en /api/randoms: 12.7kB
con gZip en /info : 624B (raro pero pesa mas comprimido)
con gZip en /api/randoms: 4.7kB
 */
