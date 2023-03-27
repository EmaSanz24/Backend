import { ProductDAO } from "../../factory/DAO.Factory.js";
import { ProductDTO, asProductDto } from "./DTO/product.js";
export class ProductRepository {
  #dao;
  constructor() {
    this.#dao = ProductDAO;
  }

  async getAll() {
    const prod = await this.#dao.getAll();
    return prod.map((p) => new ProductDTO(p));
  }
  async save(element) {
    const saved = await this.#dao.save(asProductDto(element));
    return new ProductDTO(saved);
  }
  async getById(id) {
    const search = await this.#dao.getById(id);
    if (!search) {
      return search;
    }
    return new ProductDTO(search);
  }
  async deleteById(id) {
    const remove = await this.#dao.deleteById(id);
    if (!remove) {
      return remove;
    }
    return new ProductDTO(remove);
  }
  async updateById(id, newData) {
    const update = await this.#dao.updateById(id, newData);
    if (!update) {
      return update;
    }
    return new ProductDTO(update);
  }
  async getOne(options) {
    const one = await this.#dao.getOne(options);
    if (!one) {
      return one;
    }
    return new ProductDTO(one);
  }
}
