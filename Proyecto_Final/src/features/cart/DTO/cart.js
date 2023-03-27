import { asProductDto } from "../../product/DTO/product.js";
export class CartDTO {
  constructor({ id, products, timestamp }) {
    this.id = id;
    this.products = asProductDto(products);
    this.timestamp = timestamp;
  }
}
