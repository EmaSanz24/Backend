import { Router } from "express";
import { OrderController } from "./order.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  await new OrderController(res).getOrders();
});

router.post("/confirm", async (req, res) => {
  const data = req.body;
  await new OrderController(res).confirmOrder(data);
});

export { router as MailRouter };
