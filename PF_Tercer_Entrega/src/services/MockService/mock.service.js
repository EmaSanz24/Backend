import { createFakeProduct } from "../../utils/fakeProduct-utils.js";

export class MockService {
  items = [];
  getAll(qty = 5) {
    for (let i = 1; i <= qty; i++) {
      const newItem = createFakeProduct(i);
      this.items.push(newItem);
    }
    return this.items;
  }
}
