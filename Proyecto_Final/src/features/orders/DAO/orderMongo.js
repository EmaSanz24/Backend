import { MongoDBContainer } from "../../../containers/index.js";
import { OrderModel } from "../order.model.js";

export class OrdersMongo extends MongoDBContainer {
  constructor() {
    super({
      name: OrderModel.OrdersCollection,
      schema: OrderModel.OrdersSchema,
    });
  }
}
