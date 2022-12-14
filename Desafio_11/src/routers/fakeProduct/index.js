import { Router } from "express";
import { MockService } from "../../services/index.js";

const router = Router();
const service = new MockService();

router.get("/", (req, res) => {
  const prods = service.getAll();
  res.status(200).json(prods);
});

export { router as TestRouter };
