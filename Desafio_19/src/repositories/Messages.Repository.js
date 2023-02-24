import { MessageDao } from "../dao/Dao.Factory.js";
//import { ProductModel } from "../models/ProductModel.js";
import { MessageDTO, asMessageDto } from "../dto/Message.js";
export class MessageRepo {
  #dao;
  constructor() {
    this.#dao = MessageDao();
  }

  async getAll() {
    const msg = await this.#dao.getAll();
    return msg.map((p) => new MessageDTO(p));
  }
  async save(element) {
    await this.#dao.save(asMessageDto(element));
  }
  async getById(id) {
    const search = await this.#dao.getById(id);
    return new MessageDTO(search);
  }
  async deleteById(id) {
    const remove = await this.#dao.deleteById(id);
    return new MessageDTO(remove);
  }
  async updateById(id, newData) {
    const update = await this.#dao.updateById(id, newData);
    return new MessageDTO(update);
  }
  async getOne(options) {
    const one = await this.#dao.getOne(options);
    return new MessageDTO(one);
  }
}
