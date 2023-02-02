import { MongoDBContainer } from "../../../capa_de_persistencia/containers/MongoDBContainer.js";
import { CartModel } from "../../models/index.js";

export class CartsMongo extends MongoDBContainer {
  constructor() {
    super({
      name: CartModel.CartCollection,
      schema: CartModel.CartsSchema,
    });
  }
  async getById(id) {
    const response = await this.model.findById(id).populate("products");
    return response;
  }
}
