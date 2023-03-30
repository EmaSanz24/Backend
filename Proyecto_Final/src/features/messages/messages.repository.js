import { MessageDAO } from "../../factory/DAO.Factory.js";
import { MessageDTO } from "./DTO/message.js";
import logger from "../../logs/logger.js";
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
    return msg.map((m) => {
      const data = {
        email: m.message.author.email,
        name: m.message.author.name,
        id: m.message.author.id,
        lastname: m.message.author.lastname,
        text: m.message.text,
        timestamp: m.message.timestamp,
      };
      return new MessageDTO(data);
    });
  }
  async save(msg) {
    const saved = await this.#dao.save(msg);
    return new MessageDTO(saved);
  }
}
