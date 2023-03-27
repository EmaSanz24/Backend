import logger from "../../logs/logger.js";
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR, SUCCESS_UTILS } from "../../utils/index.js";
import { CartRepository } from "./cart.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { asProductDto } from "../product/DTO/product.js";

export class CartController {
  constructor(res) {
    this.res = res;
  }
  async createCart() {
    const baseCart = await JOI_VALIDATOR.cart.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      products: [],
    });
    const cart = await new CartRepository().createCart(baseCart);
    if (!cart) {
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.CART_CREATION_FAILED }), logger.warn("Error al crear un carrito de compras nuevo");
    }

    return cart;
  }

  async deleteCart(id) {
    const cart = await new CartRepository().deleteCart(id);
    cart
      ? this.res.send({ success: true, message: SUCCESS_UTILS.MESSAGES.CART_DELETE_SUCCESS(id) })
      : (this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.CART_DELETE_FAILED(id) }),
        logger.info("no se pudo eleminar el carrito porque no existe"));
  }

  async getCartProducts(id) {
    const cart = await new CartRepository().getCart(id);
    if (!cart) {
      logger.info("el carrito ingresado no existe");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(id) });
      return;
    }
    if (cart.products.length === 0) {
      logger.info("el carrito ingresado no posee productos");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCTS_IN_CART(id) });
      return;
    }
    const products = asProductDto(cart.products);
    this.res.send(products);
  }

  async addProduct(cartId, productId) {
    const cart = await new CartRepository().getCart(cartId);
    if (!cart) {
      logger.info("el carrito ingresado no existe");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(id) });
      return;
    }
    const product = await new ProductRepository().getById(productId);
    if (!product) {
      logger.info("el producto ingresado no existe");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(id) });
      return;
    }
    let update = false;
    cart.map((prod) => {
      if (prod.id === productId) {
        prod.quantity++;
        update = true;
      }
    });
    if (update === false) cart.products.push(product);

    const updated = await new CartRepository().updateCart(cartId, cart);
    this.res.send({ success: true, cart: updated });
  }
  async deleteProduct(cartId, productId) {
    const cart = await new CartRepository().getCart(cartId);
    if (!cart) {
      logger.info("el carrito ingresado no existe");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART(id) });
      return;
    }
    const product = await new ProductRepository().getById(productId);
    if (!product) {
      logger.info("el producto ingresado no existe");
      this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(id) });
      return;
    }
    const find = cart.products.find((item) => item.id === productId);
    if (!find) {
      logger.info("el producto ingresado no se encuentra en el carrito");
      res.send({ error: true, message: ERRORS_UTILS.MESSAGES.PRODUCT_NOT_IN_CART(productId, cartId) });
      return;
    }
    const filter = cart.products.filter((item) => item.id != productId);
    const newCart = { timestamp: cart.timestamp, products: filter, id: cart.id };
    const update = await new CartRepository().updateCart(cartId, newCart);

    this.res.send({ success: true, cart: update });
  }
}
