import { Router } from "express";
import { cpus } from "os";
import compression from "compression";

const router = Router();
router.get("/", compression(), async (req, res) => {
  res.send(`
    -Argumentos de entrada:${process.argv.slice(2)}
    -Nombre de la Plataforma:${process.platform}
    -Version Node.js:${process.version}
    -Memoria total reservada:${process.memoryUsage().rss}
    -Path de ejecucion:${process.execPath}
    -Process id:${process.pid}
    -Carpeta del Proyecto:${process.cwd()}
    -Procesadores activos: ${cpus().length}`);
});

export { router as ProcessRouter };
