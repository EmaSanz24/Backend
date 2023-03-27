import { MongoDBContainer } from "../../../containers/mongoDBContainer.js";
import { CartModel } from "../cart.model.js";

export class CartsMongo extends MongoDBContainer {
  constructor() {
    super({
      name: CartModel.CartCollection,
      schema: CartModel.CartsSchema,
    });
  }
  async getById(id) {
    const res = await this.model.findById(id).populate("products");
    return res;
  }
}
