import { Router } from "express";
import { fork } from "child_process";

const router = Router();
const child = fork("./src/routers/process/factory/child.js");
router.get("/", async (req, res) => {
  const quantity = req.query.cant;

  if (!quantity) {
    //10e7 = 100.000.000
    child.send("default");
  } else {
    child.send(Number(quantity));
  }
  child.on("message", (msg) => {
    console.log(msg);
    res.send(msg);
  });
});

export { router as RandomsRouter };
