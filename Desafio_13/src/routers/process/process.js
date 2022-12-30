import { Router } from "express";
import { cpus } from "os";

const router = Router();
router.get("/", async (req, res) => {
  res.send(`
    -Argumentos de entrada:${process.argv.slice(2)}
    -Nombre de la Plataforma:${process.platform}
    -Version Node.js:${process.version}
    -Memoria total reservada:${process.memoryUsage().rss}
    -Path de ejecucion:${process.execPath}
    -Process id:${process.pid}
    -Carpeta del Proyecto:${process.cwd()}
    -Procesadores activos: ${cpus}`);
});
export { router as ProcessRouter };
