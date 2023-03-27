import { MongoDBContainer } from "../../../containers/index.js";
import { ProductModel } from "../product.model.js";

export class ProductsMongo extends MongoDBContainer {
  constructor() {
    super({
      name: ProductModel.ProductsCollection,
      schema: ProductModel.ProductSchema,
    });
  }
}
