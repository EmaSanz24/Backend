import { Router } from "express";
import { MessageController } from "./messages.controller.js";

const router = Router();

router.get("/", async (req, res) => {
  await new MessageController(res).socketStart();
  await new MessageController(res).getMessages();
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  await new MessageController(res).filterByEmail(email);
});

router.post("/", async (req, res) => {
  const data = req.body;
  await new MessageController(res).newMessage(data);
});

export { router as MessageRouter };
