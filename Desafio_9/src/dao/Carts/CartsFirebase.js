import { FirebaseContainer } from "../../containers/FirebaseContainer.js";
import { CartModel } from "../../models/index.js";

export class CartsFirebase extends FirebaseContainer {
  constructor() {
    super({
      name: CartModel.CartCollection,
    });
  }
}
