import { FirebaseContainer } from "../../containers/FirebaseContainer.js";
import { ProductModel } from "../../models/index.js";

export class ProductsFirebase extends FirebaseContainer {
  constructor() {
    super({
      name: ProductModel.CartCollection,
    });
  }
}
