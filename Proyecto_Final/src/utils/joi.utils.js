import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(40).required(),
  description: joi.string().min(3).max(120).required(),
  thumbnail: joi.string().min(3).max(500).required(),
  code: joi.string().min(1).max(15).required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  timestamp: joi.string().required(),
  category: joi.string().required(),
});

const cart = joi.object({
  timestamp: joi.string().required(),
  products: joi.array().items(product),
});

const user = joi.object({
  name: joi.string().min(3).required(),
  lastname: joi.string().min(3).required(),
  email: joi.string().min(5).required(),
  phone: joi.number().required(),
  hash: joi.string().required(),
  address: joi.string().required(),
  cart: joi.object().required(),
  timestamp: joi.string().required(),
});
const message = joi.object({
  message: {
    author: {
      id: joi.string().required(),
      name: joi.string().required(),
      lastname: joi.string().required(),
      email: joi.string().required(),
    },
    text: joi.string().max(60).required(),
    timestamp: joi.string().required(),
  },
});
export const JOI_VALIDATOR = { product, cart, user, message };
