import { Router } from "express";
import { DATE_UTILS, ERRORS_UTILS, SUCCESS_UTILS } from "../../utils/index.js";
import { CartDao, ProductDao, UserDao } from "../../dao/index.js";
import twilio from "twilio";
import { config } from "../../config/twilio.js";

const router = Router();

const client = twilio(config.user, config.pass);

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ success: true, cartId: cart.id });
});

router.delete("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await CartDao.deleteById(cartId);

    if (!cart) throw new Error();

    res.send({ success: true, message: SUCCESS_UTILS.MESSAGES.CART_DELETE_SUCCESS(cartId) });
  } catch (error) {
    res.send({ error: true, message: ERRORS_UTILS.MESSAGES.CART_DELETE_FAILED(cartId) });
  }
});

router.get("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await CartDao.getById(cartId);
    if (!cart) throw new Error("noCart");
    const products = cart.products;
    if (products.length === 0) throw new Error("noProducts");
    res.send(products);
  } catch (error) {
    if (error.message === "noCart") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(cartId) });
    } else if (error.message === "noProducts") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCTS_IN_CART(cartId) });
    }
  }
});

router.post("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await CartDao.getById(cartId);

    if (!cart) throw new Error("noCart");
    const product = await ProductDao.getById(productId);
    if (!product) throw new Error("wrongProductId");

    cart.products.push(product);

    const updatedCart = await CartDao.updateById(cartId, cart);

    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    if (error.message === "noCart") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(cartId) });
    } else if (error.message === "wrongProductId") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(productId) });
    }
  }
});

router.post("/:cartId/products/buy"),
  async (req, res) => {
    const { cartId } = req.params;
    const cart = await CartDao.getById(cartId);
    const products = cart.products;
    if (products.length === 0) throw new Error("noProducts");
    const user = await UserDao.getAll();
    user.forEach((user) => {
      if (user.cartId === cartId) {
        return (phone = user.phone);
      }
    });
    const msg = await client.messages.create({
      body: "su pedido esta en proceso, a continuacion estan sus productos comprados: " + products,
      from: config.number,
      to: "whatsapp:" + phone,
    });
  };
//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

router.delete("/:cartId/products/:prodId", async (req, res) => {
  const { cartId, prodId } = req.params;

  try {
    const cart = await CartDao.getById(cartId);
    if (!cart) throw new Error("noCart");

    const product = await ProductDao.getById(prodId);
    if (!product) throw new Error("wrongProductId");

    const products = cart.products;
    const check = products.find((item) => item.id === prodId);
    if (!check) throw new Error("noProductInCart");

    const filter = cart.products.filter((item) => item.id != prodId);
    const newCart = { timestamp: cart.timestamp, products: filter, id: cart.id };

    const updatedCart = await CartDao.updateById(cartId, newCart);

    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    if (error.message === "noCart") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(cartId) });
    } else if (error.message === "wrongProductId") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(prodId) });
    } else if (error.message === "noProductInCart") {
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.PRODUCT_NOT_IN_CART(prodId, cartId) });
    }
  }
});
export { router as CartRouter };
