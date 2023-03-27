import { MessageDAO } from "../../factory/DAO.Factory.js";
import { MessageDTO } from "./DTO/message.js";

export class MessageRepository {
  #dao;
  constructor() {
    this.#dao = MessageDAO;
  }

  async getAll() {
    const msg = await this.#dao.getAll();
    if (!msg) {
      return msg;
    }
    return msg.map((m) => new MessageDTO(m));
  }
  async save(msg) {
    const saved = await this.#dao.save(msg);
    return new MessageDTO(saved);
  }
}
