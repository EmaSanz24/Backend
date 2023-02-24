import { Schema } from "mongoose";

// class Product {
//   constructor({ id, title, description, code, thumbnail, price, stock, timestamp }) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.code = code;
//     this.thumbnail = thumbnail;
//     this.price = price;
//     this.stock = stock;
//     this.timestamp = timestamp;
//   }
// }

const ProductsCollection = "products";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 150 },
    code: { type: String, required: true, max: 10 },
    thumbnail: { type: String, required: true, max: 1000 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
    timestamp: { type: String, required: true, max: 100 },
  },
  { virtuals: true }
);

ProductSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const ProductModel = { ProductSchema, ProductsCollection };
