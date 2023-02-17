import { ProductDao } from "../dao/Dao.Factory.js";
//import { ProductModel } from "../models/ProductModel.js";
import { ProductDTO, asProductDto } from "../dto/Product.js";
export class ProductRepo {
  #dao;
  constructor() {
    this.#dao = ProductDao();
  }

  async getAll() {
    const prod = await this.#dao.getAll();
    return prod.map((p) => new ProductDTO(p));
  }
  async save(element) {
    await this.#dao.save(asProductDto(element));
  }
  async getById(id) {
    const search = await this.#dao.getById(id);
    return new ProductDTO(search);
  }
  async deleteById(id) {
    const remove = await this.#dao.deleteById(id);
    return new ProductDTO(remove);
  }
  async updateById(id, newData) {
    const update = await this.#dao.updateById(id, newData);
    return new ProductDTO(update);
  }
  async getOne(options) {
    const one = await this.#dao.getOne(options);
    return new ProductDTO(one);
  }
}
