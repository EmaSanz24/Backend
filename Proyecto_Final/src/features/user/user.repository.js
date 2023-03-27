import { UserDAO } from "../../factory/DAO.Factory.js";
import { UserDTO } from "./DTO/user.js";
export class UserRepository {
  #dao;
  constructor() {
    this.#dao = UserDAO;
  }
  async getById(id) {
    const search = await this.#dao.getById(id);
    if (!search) {
      return search;
    }
    return new UserDTO(search);
  }
  async getOne(options) {
    const search = await this.#dao.getOne(options);
    if (!search) {
      return search;
    }
    return new UserDTO(search);
  }
  async save(user) {
    const save = await this.#dao.save(user);
    return new UserDTO(save);
  }
}
