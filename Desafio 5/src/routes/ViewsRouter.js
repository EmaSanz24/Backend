import { Router } from "express";
import Container from "../containers/Container.js";
const productContainer = new Container("products");

const ViewsRouter = Router();

ViewsRouter.get("/", (req, res) => {
  res.render("form-products");
});

ViewsRouter.post("/products", async (req, res) => {
  const { title, price, thumbnail } = req.body;

  await productContainer.save({ title, price, thumbnail });
  res.redirect("/");
});

ViewsRouter.get("/products", async (req, res) => {
  const products = await productContainer.getAll();
  res.render("table-products", { products: products });
});

export default ViewsRouter;
