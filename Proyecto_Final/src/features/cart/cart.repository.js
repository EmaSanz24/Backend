import { CartDAO } from "../../factory/DAO.Factory.js";
import { CartDTO } from "./DTO/cart.js";
import logger from "../../logs/logger.js";

export class CartRepository {
  #dao;
  constructor() {
    this.#dao = CartDAO;
  }
  async createCart(baseCart) {
    const created = await this.#dao.save(baseCart);
    logger.debug(`repository createCart: ${created}`);
    return created;
    // return new CartDTO(created);
  }
  async deleteCart(id) {
    const deleted = await this.#dao.deleteById(id);
    logger.debug(`repository deleteCart:  ${deleted}`);
    if (!deleted) {
      return deleted;
    }
    return new CartDTO(deleted);
  }

  async getCart(id) {
    const cart = await this.#dao.getById(id);
    logger.debug(`repository getCart:  ${cart}`);
    if (!cart) {
      return cart;
    }
    return new CartDTO(cart);
  }
  async updateCart(id, data) {
    const update = await this.#dao.updateById(id, data);
    logger.debug(`repository updateCart: ${data}`);
    return new CartDTO(update);
  }
}
