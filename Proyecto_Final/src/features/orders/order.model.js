import { Schema } from "mongoose";

const OrdersCollection = "orders";

const OrdersSchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: "products" }],
    orderNumber: { type: Number, required: true },
    timestamp: { type: String, required: true },
    status: { type: String, required: true, default: "generated" },
    email: { type: String, required: true },
  },
  { virtuals: true }
);

OrdersSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const OrderModel = { OrdersSchema, OrdersCollection };
