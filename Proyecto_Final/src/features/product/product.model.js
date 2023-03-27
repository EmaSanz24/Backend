import { Schema } from "mongoose";

const ProductsCollection = "products";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 150 },
    code: { type: String, required: true, max: 10 },
    quantity: { type: Number, required: true, max: 30, default: 1 },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 1 },
    timestamp: { type: String, required: true, max: 100 },
    category: { type: String, required: true, max: 50 },
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
