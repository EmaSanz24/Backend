import { Router } from "express";
import { fork } from "child_process";
import compression from "compression";
import logger from "../../logs/logger.js";

const router = Router();
//const child = fork("./src/routers/process/factory/child.js");
router.get("/", compression(), async (req, res) => {
  const quantity = req.query.cant;
  let qtty = 0;
  if (!quantity) {
    qtty = 10e7;
  } else {
    if (isNaN(quantity)) {
      logger.error(`se ingreso un valor no numerico: ${quantity}`);
    }
    qtty = Number(quantity);
    logger.info(`se ingreso el numero ${qtty} en la ejecucion`);
  }
  let qttyOfNumbers = {};
  let numbers = [];
  for (let i = 0; i < qtty; i++) {
    const numb = Math.floor(Math.random() * 1000) + 1;
    numbers.push(numb);
  }

  let countFunc = (keys) => {
    qttyOfNumbers[keys] = ++qttyOfNumbers[keys] || 1;
  };

  numbers.forEach(countFunc);

  res.send(qttyOfNumbers);
});

export { router as RandomsRouter };
