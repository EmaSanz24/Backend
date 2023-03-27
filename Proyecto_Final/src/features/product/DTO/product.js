export class ProductDTO {
  constructor({ id, title, description, code, thumbnail, price, stock, timestamp, quantity, category }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
    this.timestamp = timestamp;
    this.quantity = quantity;
    this.category = category;
  }
}
export function asProductDto(el) {
  if (Array.isArray(el)) return el.map((obj) => new ProductDTO(obj));
  else return new ProductDTO(el);
}
