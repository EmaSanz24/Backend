import { Router } from "express";
import { CartController } from "./cart.controller.js";

const router = Router();

router.post("/", async (req, res) => {
  await new CartController(res).createCart();
});

router.delete("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  await new CartController(res).deleteCart(cartId);
});

router.get("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;

  await new CartController(res).getCartProducts(cartId);
});

router.post("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  await new CartController(res).addProduct(cartId, productId);
});

router.delete("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  await new CartController(res).deleteProduct(cartId, productId);
});
export { router as CartRouter };
