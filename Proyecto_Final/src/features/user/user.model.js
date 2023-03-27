import { Schema } from "mongoose";

const UserCollection = "users";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    hash: { type: String, required: true },
    address: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    timestamp: { type: String, required: true },
  },
  { virtuals: true }
);

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const UserModel = { UserCollection, UserSchema };
