import { Schema } from "mongoose";

const CartCollection = "carts";

const CartsSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  { virtuals: true }
);

CartsSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const CartModel = { CartCollection, CartsSchema };
