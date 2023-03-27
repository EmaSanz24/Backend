import logger from "../../logs/logger.js";
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from "../../utils/index.js";
import { ProductRepository } from "./product.repository.js";

export class ProductController {
  constructor(res) {
    this.res = res;
  }
  async getAll() {
    const product = await new ProductRepository().getAll();
    product ? this.res.send(product) : this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCTS });
    return product;
  }
  async getById(id) {
    const product = await new ProductRepository().getById(id);
    product ? this.res.send(product) : this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT_FOUND(id) });
    return product;
  }
  async save(data) {
    const { title, description, code, thumbnail, price, stock, category } = data;
    const product = await JOI_VALIDATOR.product.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      category,
    });
    const createdProduct = await new ProductRepository().save(product);
    createdProduct
      ? this.res.send(createdProduct)
      : (this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.ADD_FAILED }), logger.warn("Error at saving new product"));

    return createdProduct;
  }
  async updateById(data, id) {
    const { title, description, code, thumbnail, price, stock } = data;

    const product = await JOI_VALIDATOR.product.validateAsync({
      timestamp: DATE_UTILS.getTimestamp(),
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    });
    const updatedProduct = await new ProductRepository().updateById(id, product);

    updatedProduct
      ? this.res.send(updatedProduct)
      : (this.res.send({ error: true, message: ERRORS_UTILS.MESSAGES.PRODUCT_UPDATE_FAILED(id) }), logger.warn("Error at updating product"));
  }
  async deleteById(id) {
    const element = await new ProductRepository().deleteById(id);

    element ? this.res.send({ success: true }) : this.res.send({ error: ERRORS_UTILS.MESSAGES.DELETE_FAILED });
  }
}
