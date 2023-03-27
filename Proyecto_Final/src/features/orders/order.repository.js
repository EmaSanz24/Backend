import { OrderDAO } from "../../factory/DAO.Factory.js";
import { OrderDTO } from "./DTO/orders.js";

export class OrderRepository {
  #dao;
  constructor() {
    this.#dao = OrderDAO;
  }

  async getAll() {
    const orders = await this.#dao.getAll();
    return orders.map((o) => new OrderDTO(o));
  }
  async save(data) {
    const saved = await this.#dao.save(data);
    return new OrderDTO(saved);
  }
}
