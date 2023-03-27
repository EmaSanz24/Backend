import { Router } from "express";
import { ProductController } from "./product.controller.js";
const router = Router();

router.get("/", async (req, res) => {
  await new ProductController(res).getAll();
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await new ProductController(res).getById(id);
});

router.post("/", async (req, res) => {
  const data = req.body;
  await new ProductController(res).save(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await new ProductController(res).updateById(data, id);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await new ProductController(res).deleteById(id);
});

export { router as ProductRouter };
